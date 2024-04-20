import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { fonts, onBgColor } from "../../../lib/themes";
type HeaderProps = {
  title: string;
  size?: "small" | "medium" | "large";
};
export default function TextHeader(props: HeaderProps) {
  let fontSize: number = 20;

  switch (props.size) {
    case "small":
      fontSize = 20;
      break;
    case "medium":
      fontSize = 30;
      break;
    case "large":
      fontSize = 40;
      break;
  }

  return (
    <View>
      <Text
        style={{
          color: onBgColor(),
          fontSize: fontSize,
          fontFamily: fonts.overpassBold,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
