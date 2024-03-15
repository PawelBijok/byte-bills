import { router } from "expo-router"
import { Pressable, Text, View } from "react-native"

export default function Page() {
  return (
    <View>
      <Text>Add receipt</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Go back</Text>
      </Pressable>
    </View>
  )
}
