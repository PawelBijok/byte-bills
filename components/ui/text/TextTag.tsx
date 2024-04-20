import { View, Text } from "react-native";
import { accentColor, fonts, onAccentColor } from "../../../lib/themes";

type TextTagProps = {
  title: string;
};

export default function TextTag(props: TextTagProps) {
  return (
    <View
      style={{
        backgroundColor: accentColor(),
        paddingHorizontal: 5,
        paddingBottom: 1,
        paddingTop: 2,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: onAccentColor(),
          fontFamily: fonts.overpass,
          fontSize: 12,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
