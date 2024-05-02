import { Text, View } from "react-native";
import { onBgColor } from "../../lib/themes";

export default function AddBill() {
  return <View><Text style={{ color: onBgColor() }}>
    We'll be implementing addition here
  </Text></View>
}
