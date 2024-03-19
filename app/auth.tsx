import { Stack } from "expo-router"
import { View } from "react-native"
import Auth from "../components/Auth"

export default function AuthPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Auth",
        }}
      />
      <Auth />
    </View>
  )
}
