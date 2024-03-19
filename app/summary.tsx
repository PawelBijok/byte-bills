import { Link, Stack } from "expo-router"
import { Text, View } from "react-native"

export default function Page() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Summary",
        }}
      />
      <Text>summary</Text>
      <Link push href="/add">
        Add
      </Link>
      <Link href="">Go back</Link>
    </View>
  )
}
