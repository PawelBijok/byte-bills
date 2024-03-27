import { View } from "react-native"

type DashedSpacerProps = {
  elements?: number
  elementHeight?: number
  color?: string
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
            backgroundColor: props.color,
            flex: 1,
            margin: 5,
          }}
        ></View>
      ))}
    </View>
  )
}
