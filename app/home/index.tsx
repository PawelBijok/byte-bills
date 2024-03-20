import { View, Text } from "react-native";
import Account from "../../components/Account";
import { Stack } from "expo-router";

export default function App() {
  return (
    <View>
      <Stack.Screen options={{ title: "Home" }} />
      <Account />
    </View>
  );
}
