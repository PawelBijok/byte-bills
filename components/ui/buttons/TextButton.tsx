import { Text } from "react-native";
import { Button } from "react-native-elements";
import { accentColor, fonts, isDark } from "../../../lib/themes";
import { ButtonIcon } from "./config/buttonIcon";

type TextButtonProps = {
  title: string;
  onPress: () => void;
  icon?: ButtonIcon;
};
export const TextButton = (props: TextButtonProps) => {
  return (
    <Button
      title={props.title}
      type="clear"
      titleStyle={{ fontFamily: fonts.pixelify, color: accentColor() }}
      icon={props.icon ? { ...props.icon!, color: accentColor() } : undefined}
      iconRight={props.icon?.iconRight ?? false}
      onPress={props.onPress}
    />
  );
};
