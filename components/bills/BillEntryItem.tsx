import { Text, View } from "react-native"
import { fonts, onBgColor, onBgSubtleColor } from "../../lib/themes"
import { Gap } from "../ui/common/Gap"
import TextTag from "../ui/text/TextTag"

export default function BillEntryItem() {
  let textColor = onBgColor()
  let borderColor = onBgSubtleColor()
  return (
    <View
      style={{
        borderColor: borderColor,
        borderWidth: 2,
        padding: 10,
        borderStyle: "dashed",
        borderRadius: 5
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize: 16,
            fontFamily: fonts.overpassBold,
          }}
        >
          420,23 pln
        </Text>
        <Text style={{ color: textColor, fontFamily: fonts.pixelify }}>
          2024-04-20
        </Text>
      </View>
      <Gap size="s" />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: 4,
          rowGap: 2,
        }}
      >
        <TextTag title="Groceries" />
        <TextTag title="Alcohol" />
        <TextTag title="Utils" />
        <TextTag title="Home" />
      </View>
    </View>
  )
}
