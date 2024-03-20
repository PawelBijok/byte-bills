import { ThemeProvider } from "@react-navigation/native"
import { Slot, SplashScreen } from "expo-router"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as supabase from "../lib/supabase"
import { DarkNavigationTheme, LightNavigationTheme } from "../lib/themes"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    supabase.initialize(() => SplashScreen.hideAsync())
  }, [])

  const colorScheme = useColorScheme()

  return (
    <ThemeProvider
      value={colorScheme == "dark" ? DarkNavigationTheme : LightNavigationTheme}
    >
      <Slot />
    </ThemeProvider>
  )
}
