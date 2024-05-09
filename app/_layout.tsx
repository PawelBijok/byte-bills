import { ThemeProvider } from "@react-navigation/native";
import { Slot, SplashScreen, router } from "expo-router";
import { useColorScheme } from "react-native";
import UserProvider from "../context/UserContext";
import { DarkNavigationTheme, LightNavigationTheme } from "../lib/themes";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme == "dark" ? DarkNavigationTheme : LightNavigationTheme}
    >
      <UserProvider>
        <Slot />
      </UserProvider>
    </ThemeProvider>
  );
}
