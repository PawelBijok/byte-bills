import { Text } from "react-native";
import { Button } from "react-native-elements";
import { isDark } from "../../../lib/themes";
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
      titleStyle={[
        isDark() ? { color: "white" } : { color: "black" },
        { fontFamily: "Pixelify" },
      ]}
      icon={props.icon ? { ...props.icon!, color: isDark() ? "white" : "black" } : undefined}
      iconRight={props.icon?.iconRight ?? false}
      onPress={props.onPress}
    />
  );
};
