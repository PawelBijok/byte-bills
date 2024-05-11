import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Redirect, SplashScreen, Stack, Tabs } from "expo-router";
import { BillsProvider } from "../../../context/BillsContext";
import CurrencyProvider from "../../../context/CurrencyContext";
import { useUser } from "../../../context/UserContext";

export default function HomeLayout() {
  const userContext = useUser();
  SplashScreen.hideAsync();

  if (userContext.user === undefined) {
    return <Redirect href="/auth" />;
  }

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
