import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { fonts, onBgColor, onBgSubtleColor } from "../../lib/themes"
import { Gap } from "../ui/common/Gap"
import { DashedSpacer } from "../ui/spacers/DashedSpacer"

export default function MonthSummary() {
  let color = onBgColor()
  let borderColor = onBgSubtleColor()
  return (
    <View>
      <DashedSpacer
        color={borderColor}
        elementHeight={2}
        elementSpacing={10}
        elements={15}
      />
      <Gap size="l" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color, fontSize: 25, fontFamily: fonts.overpassBlack }}>
          561,69 pln
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("export month")
          }}
        >
          <View style={{ padding: 5 }}>
            <MaterialCommunityIcons name="export" size={30} color={color} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}