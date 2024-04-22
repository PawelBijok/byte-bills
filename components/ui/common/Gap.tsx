import { View } from "react-native"

type GapProps = {
  customSize?: number
  size?: "s" | "m" | "l" | "xl"
}
export const Gap = (props: GapProps) => {
  let size = 0

  if (props.customSize) {
    size = props.customSize
  } else {
    switch (props.size) {
      case "s":
        size = 5
        break
      case "m":
        size = 10
        break
      case "l":
        size = 15
        break
      case "xl":
        size = 25
        break
      default:
        size = 0
        break
    }
  }

  return <View style={{ height: size, width: size }} />
}
