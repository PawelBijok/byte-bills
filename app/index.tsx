import { Pressable, View, Text, SafeAreaView } from "react-native";
import "react-native-url-polyfill/auto";
import Account from "../components/Account";
import { router } from "expo-router";

export default function App() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Pressable
        onPress={() => {
          router.push("/auth");
        }}
      >
        <Text>Go to Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}
