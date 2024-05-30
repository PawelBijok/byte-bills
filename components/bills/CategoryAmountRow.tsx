import { Feather } from "@expo/vector-icons"
import { InputAccessoryView, TouchableOpacity, View } from "react-native"
import { accentColor, onBgSubtleColor } from "../../lib/themes"
import { Gap } from "../ui/common/Gap"
import { AppInput } from "../ui/inputs/AppInput"
import TextTag from "../ui/text/TextTag"

type CategoryAmountRowProps = {
  categoryName?: string
  amount?: string
  onNameChanged: (name: string) => void
  onAmountChanged: (value: string) => void
  onDelete: () => void
  enableDeleteButton?: boolean
  suggestions?: string[]
}

export default function CategoryAmountRow(props: CategoryAmountRowProps) {
  const inputAccessoryMostUsedCategoriesName = "mostUsedCategoriesName"
  return (
    <>
      <InputAccessoryView nativeID={inputAccessoryMostUsedCategoriesName}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            padding: 5,
            flexWrap: "wrap",
          }}
        >
          {props.suggestions &&
            props.suggestions.map((name) => (
              <TextTag
                title={name}
                key={name}
                size="lg"
                onPress={() => {
                  props.onNameChanged(name)
                }}
              />
            ))}
        </View>
      </InputAccessoryView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 2,
          }}
        >
          <AppInput
            label="Category"
            widthFraction={0.66}
            keyboardType="default"
            value={props.categoryName ?? ""}
            onChangeText={props.onNameChanged}
            inputAccessoryViewID={props.suggestions !== undefined ? inputAccessoryMostUsedCategoriesName : undefined}
          />
        </View>
        <Gap size="xl" />
        <View
          style={{
            flex: 1,
          }}
        >
          <AppInput
            label="Amount"
            widthFraction={0.33}
            keyboardType="decimal-pad"
            value={props.amount?.toString() ?? ""}
            onChangeText={props.onAmountChanged}
          />
        </View>
        <Gap size="m" />
        <TouchableOpacity
          activeOpacity={props.enableDeleteButton ? 0.2 : 1}
          onPress={props.enableDeleteButton ? props.onDelete : undefined}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <Feather
              name="minus-square"
              size={20}
              color={props.enableDeleteButton ? accentColor() : onBgSubtleColor()}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}
