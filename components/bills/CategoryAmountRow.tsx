import { Feather } from "@expo/vector-icons"
import { TouchableOpacity, View } from "react-native"
import { accentColor, onBgSubtleColor } from "../../lib/themes"
import { Gap } from "../ui/common/Gap"
import { AppInput } from "../ui/inputs/AppInput"

type CategoryAmountRowProps = {
  categoryName?: string
  amount?: string
  onNameChanged: (name: string) => void
  onAmountChanged: (value: string) => void
  onDelete: () => void
  enableDeleteButton?: boolean
}

export default function CategoryAmountRow(props: CategoryAmountRowProps) {
  return (
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
          <Feather name="minus-square" size={20} color={props.enableDeleteButton ? accentColor() : onBgSubtleColor()} />
        </View>
      </TouchableOpacity>
    </View>
  )
}
