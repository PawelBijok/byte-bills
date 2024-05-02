import { Text, View } from "react-native";
import { onBgColor } from "../../lib/themes";
import { Stack } from "expo-router";

export default function AddNewBill() {
  return <View>
    <Text style={{ color: onBgColor() }}>
      We'll be implementing addition here
    </Text></View>
}
