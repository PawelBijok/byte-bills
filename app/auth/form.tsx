import { Stack } from "expo-router";
import { Text, View } from "react-native";
import Auth from "../../components/pages/Auth";
import { useState } from "react";

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: isRegistering ? "Sign up" : "Sign in",
          animation: "slide_from_bottom",
        }}
      />
      <View style={{ flex: 1 }}>
        <Auth onTypeChanged={setIsRegistering} />
      </View>
    </View>
  );
}
