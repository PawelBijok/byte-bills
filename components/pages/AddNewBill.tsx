import { FlatList, View } from "react-native";
import { FilledButton } from "../ui/buttons/FilledButton";
import { router } from "expo-router";
import CategotyAmountRow from "../bills/CategoryAmountRow";

import { TextButton } from "../ui/buttons/TextButton";
import { Gap } from "../ui/common/Gap";
import { useEffect, useState } from "react";

type EditableCategory = {
  id: number,
  name: string,
  value: string,

}

export default function AddNewBill() {
  const freshCategory = { name: '', value: '', id: 1, }
  const [categories, setCategories] = useState<EditableCategory[]>([{ ...freshCategory }])


  const updateCategoryName = (id: number, name: string) => {
    setCategories((oldCategories) => {
      return oldCategories.map((category) => {
        if (category.id === id) {
          return { ...category, name }
        }
        return category
      })
    })
  }
  const updateCategoryAmount = (id: number, value: string) => {
    setCategories((oldCategories) => {
      return oldCategories.map((category) => {
        if (category.id === id) {
          return { ...category, value: value }
        }
        return category
      })
    })
  }

  useEffect(() => {
    console.log(categories)
  }, [categories])

  const addNewCategory = () => {
    setCategories((oldCategories) => {
      return [...oldCategories, { ...freshCategory, id: oldCategories.length + 1 }]
    })
  }

  const canDismiss = router.canGoBack();
  return <View style={{
    flex: 1,
    padding: 15,
  }}>
    <View
      style={{
        flexGrow: 1,
        gap: 15
      }}

    >
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategotyAmountRow categoryName={item.name}
          amount={item.value}
          onAmountChanged={(amount) => updateCategoryAmount(item.id!, amount)}
          onNameChanged={(name) => updateCategoryName(item.id!, name)}
        />
        }
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Gap size="xl" />}

        ListFooterComponent={() => <TextButton title="New category" onPress={addNewCategory}
          icon={{
            name: 'plus',
            type: 'font-awesome',
            size: 15,
          }}

        />}
      />
    </View>

    <FilledButton title="Save"


      onPress={canDismiss ? () => {
        router.back();
      } : undefined} />
  </View>
}
