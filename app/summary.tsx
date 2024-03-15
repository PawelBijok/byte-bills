import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function Page() {
  return (
    <View>
      <Text>summary</Text>
      <Link push href="/add">
        Add
      </Link>
      <Link href="">Go back</Link>
    </View>
  )
}
