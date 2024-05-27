import * as Crypto from "expo-crypto"
import { router } from "expo-router"
import moment from "moment"
import { useState } from "react"
import { Alert, FlatList, View } from "react-native"
import { saveBill } from "../../lib/db/bills"
import { useBillsStore } from "../../store/BillsStore"
import { useCurrenciesStore } from "../../store/CurrenciesStore"
import { useUserStore } from "../../store/UserStore"
import { Bill, Category } from "../../types/bill"
import { Currency } from "../../types/currency"
import CategoryAmountRow from "../bills/CategoryAmountRow"
import { FilledButton } from "../ui/buttons/FilledButton"
import LabelButtonRow from "../ui/buttons/LabelButtonRow"
import { TextButton } from "../ui/buttons/TextButton"
import { Gap } from "../ui/common/Gap"
import CurrencySelector from "../ui/modals/CurrencySelector"
import DateSelector from "../ui/modals/DateSelector"

type EditableCategory = {
  id: string
  name: string
  value: string
}

export default function AddNewBill() {
  const currenciesStore = useCurrenciesStore()
  const userStore = useUserStore()
  const billsStore = useBillsStore()
  const [currencyPickerVisible, setCurrencyPickerVisible] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    userStore.profile?.currency ?? currenciesStore.availableCurrencies![0]
  )
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const freshCategory = { name: "", value: "", id: "1" }
  const [categories, setCategories] = useState<EditableCategory[]>([{ ...freshCategory }])
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    const billCategoties: Category[] = categories.map((category) => {
      const value = parseFloat(category.value.replaceAll(",", "."))
      return {
        name: category.name,
        value: value,
      }
    })

    const bill: Bill = {
      date: selectedDate,
      id: Crypto.randomUUID(),
      currency: selectedCurrency,
      categories: billCategoties,
    }

    const databaseBill = await saveBill(bill)
    setLoading(false)
    if (databaseBill === undefined) {
      return Alert.alert("Error", "Failed to save bill")
    }

    billsStore.addBill(databaseBill)

    if (canDismiss) {
      router.back()
    }
  }

  const updateCategoryName = (id: string, name: string) => {
    setCategories((oldCategories) => {
      return oldCategories.map((category) => {
        if (category.id === id) {
          return { ...category, name }
        }
        return category
      })
    })
  }
  const updateCategoryAmount = (id: string, value: string) => {
    setCategories((oldCategories) => {
      return oldCategories.map((category) => {
        if (category.id === id) {
          return { ...category, value: value }
        }
        return category
      })
    })
  }

  const addNewCategory = () => {
    const UUID = Crypto.randomUUID()
    setCategories((oldCategories) => {
      return [...oldCategories, { ...freshCategory, id: UUID }]
    })
  }

  const deleteCategory = (id: string) => {
    setCategories((oldCategories) => {
      return oldCategories.filter((c) => c.id !== id)
    })
  }

  const canDismiss = router.canGoBack()
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
      }}
    >
      <View
        style={{
          flexGrow: 1,
          gap: 15,
        }}
      >
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryAmountRow
              categoryName={item.name}
              amount={item.value}
              onAmountChanged={(amount) => updateCategoryAmount(item.id, amount)}
              onNameChanged={(name) => updateCategoryName(item.id, name)}
              onDelete={() => deleteCategory(item.id)}
              enableDeleteButton={categories.length > 1}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Gap size="xl" />}
          ListFooterComponent={() => (
            <View style={{ paddingTop: 30 }}>
              <TextButton
                title="New category"
                onPress={addNewCategory}
                icon={{
                  name: "plus",
                  type: "font-awesome",
                  size: 15,
                }}
              />
            </View>
          )}
        />
      </View>
      <LabelButtonRow
        buttonLabel={selectedCurrency.shortName}
        label="Select currency"
        onPress={() => setCurrencyPickerVisible(true)}
      />
      <LabelButtonRow
        buttonLabel={moment(selectedDate).format("DD-MM-YYYY")}
        label="Select date"
        onPress={() => setDatePickerVisible(true)}
      />

      <FilledButton title="Save" onPress={save} loading={loading} />
      <CurrencySelector
        visible={currencyPickerVisible}
        initialValue={selectedCurrency}
        onCancel={() => setCurrencyPickerVisible(false)}
        onCurrencySelected={(currency) => {
          setCurrencyPickerVisible(false)
          setSelectedCurrency(currency)
        }}
      />
      <DateSelector
        visible={datePickerVisible}
        onCancel={() => setDatePickerVisible(false)}
        onDateSelected={(date) => {
          setDatePickerVisible(false)
          setSelectedDate(date)
        }}
      />
    </View>
  )
}
