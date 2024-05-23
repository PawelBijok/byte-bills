import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useMemo } from "react"
import { Alert } from "react-native"
import { getCurrencies } from "../../lib/db/currencies"
import { useCurrenciesStore } from "../../store/CurrenciesStore"

export default function HomeLayout() {
  const currenciesStore = useCurrenciesStore()
  useMemo(() => {
    const initializeCurrencies = async () => {
      const currencies = await getCurrencies()
      if (currencies === undefined) {
        Alert.alert("Failed to fetch currencies")
      } else {
        currenciesStore.setAvailableCurrencies(currencies)
      }
    }
    initializeCurrencies()
  }, [])
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="bills"
        options={{
          title: "Bills",
          tabBarIcon: ({ color }) => <FontAwesome5 name="receipt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}
