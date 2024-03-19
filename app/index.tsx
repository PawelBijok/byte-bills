import { Link } from "expo-router"
import { Text, View, useColorScheme } from "react-native"

export default function Home() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: isDark ? "white" : "black" }}>Home Screen</Text>
      <Link
        style={{ color: isDark ? "white" : "black" }}
        href={{ pathname: "summary", params: { name: "Bacon" } }}
      >
        Go to Details
      </Link>
    </View>
  )
}
