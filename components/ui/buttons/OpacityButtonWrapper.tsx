import { TouchableOpacity, View } from "react-native"

type OpacityButtonWrapperProps = {
  children: React.ReactNode
  onPress: () => void
  padding?: number
}

export default function OpacityButtonWrapper(props: OpacityButtonWrapperProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ padding: props.padding ?? 5 }}>{props.children}</View>
    </TouchableOpacity>
  )
}
