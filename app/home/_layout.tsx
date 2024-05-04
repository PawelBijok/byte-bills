import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { BillsProvider } from "../../context/BillsContext";
import CurrencyProvider from "../../context/CurrencyContext";

export default function HomeLayout() {
  return (
    <BillsProvider>
      <CurrencyProvider>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="bills"
            options={{
              title: "Bills",
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="receipt" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </CurrencyProvider>
    </BillsProvider>
  );
}
