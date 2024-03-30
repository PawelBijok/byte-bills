import { Text } from "react-native";
import { Button } from "react-native-elements";
import { isDark } from "../../../lib/themes";
type TextButtonProps = {
  title: string;
  onPress: () => void;
};
export const TextButton = (props: TextButtonProps) => {
  return (
    <Button
      title={props.title}
      type="clear"
      titleStyle={[isDark() ? { color: "white" } : { color: "black" }]}
      onPress={props.onPress}
    />
  );
};
