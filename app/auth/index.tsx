import { Stack } from "expo-router";
import { View, Text } from "react-native";
import Auth from "../../components/Auth";

export default function AuthPage() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Auth" }} />
      <View style={{ flex: 1 }}>
        <Auth />
      </View>
    </View>
  );
}
