import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { fonts, onBgColor, onBgSubtleColor } from "../../lib/themes"
import OpacityButtonWrapper from "../ui/buttons/OpacityButtonWrapper"
import { Gap } from "../ui/common/Gap"
import { DashedSpacer } from "../ui/spacers/DashedSpacer"

type MonthSummaryProps = {
  sum: number
  currency: string
}
export default function MonthSummary(props: MonthSummaryProps) {
  let color = onBgColor()
  let borderColor = onBgSubtleColor()
  return (
    <View>
      <DashedSpacer color={borderColor} elementHeight={2} elementSpacing={10} elements={15} />
      <Gap size="l" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color, fontSize: 25, fontFamily: fonts.overpassBlack }}>
          {`${props.sum.toFixed(2)} ${props.currency}`}
        </Text>
        <OpacityButtonWrapper onPress={() => console.log("export pressed")}>
          <MaterialCommunityIcons name="export" size={30} color={color} />
        </OpacityButtonWrapper>
      </View>
    </View>
  )
}
