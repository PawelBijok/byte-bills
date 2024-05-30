import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { accentColor, fonts, onAccentColor } from "../../../lib/themes"

type TextTagProps = {
  title: string
  onPress?: () => void
  size?: "sm" | "lg"
}

export default function TextTag(props: TextTagProps) {
  const isSmall = (props.size ?? "sm") === "sm"
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.onPress === undefined}>
      <View
        style={{
          backgroundColor: accentColor(),
          paddingHorizontal: isSmall ? 5 : 7,
          paddingBottom: isSmall ? 1 : 3,
          paddingTop: isSmall ? 2 : 4,
          borderRadius: isSmall ? 5 : 8,
        }}
      >
        <Text
          style={{
            color: onAccentColor(),
            fontFamily: isSmall ? fonts.overpass : fonts.overpassBold,
            fontSize: isSmall ? 12 : 15,
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
