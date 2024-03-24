import { View } from "react-native"
import { isDark } from "../../../lib/themes"

type DashedSpacerProps = {
  elements?: number
  elementHeight?: number
}

export const DashedSpacer = (props: DashedSpacerProps) => {
  let items = new Array(props.elements ?? 10).fill(null)

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {items.map((_, index) => (
        <View
          key={index}
          style={{
            height: props.elementHeight ?? 3,
            backgroundColor: isDark() ? "white" : "black",
            flex: 1,
            margin: 5,
          }}
        ></View>
      ))}
    </View>
  )
}
