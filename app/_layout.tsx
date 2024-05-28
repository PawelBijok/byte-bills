import { ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot, SplashScreen, router } from "expo-router"
import { useEffect, useMemo, useState } from "react"
import { useColorScheme } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { getProfile } from "../lib/db/profile"
import * as supabase from "../lib/supabase"
import { DarkNavigationTheme, LightNavigationTheme, fonts } from "../lib/themes"
import { useUserStore } from "../store/UserStore"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [initialized, setInitialized] = useState(false)
  const userStore = useUserStore()

  useMemo(() => {
    supabase.initialize(async (session) => {
      setInitialized(true)
      userStore.setUser(session?.user)
      if (session !== null) {
        const profile = await getProfile(session.user)
        userStore.setProfile(profile)
      } else {
        userStore.setProfile(undefined)
      }
    })
  }, [])

  const [fontsLoaded] = useFonts({
    [fonts.overpass]: require("../assets/fonts/Overpass-Regular.ttf"),
    [fonts.overpassBold]: require("../assets/fonts/Overpass-Bold.ttf"),
    [fonts.overpassBlack]: require("../assets/fonts/Overpass-Black.ttf"),
    [fonts.overpassLight]: require("../assets/fonts/Overpass-Light.ttf"),
    [fonts.pixelify]: require("../assets/fonts/PixelifySans-Regular.ttf"),
  })

  useEffect(() => {
    if (initialized && fontsLoaded) {
      if (userStore.user != null) {
        router.replace("/home")
      } else {
        router.replace("/auth")
      }
      SplashScreen.hideAsync()
    }
  }, [initialized, fontsLoaded, userStore.user])

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme == "dark" ? DarkNavigationTheme : LightNavigationTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
