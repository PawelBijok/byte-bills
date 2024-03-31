import { View } from "react-native";

type GapProps = {
  size?: number;
};
export const Gap = (props: GapProps) => {
  return <View style={{ height: props.size, width: props.size }} />;
};
