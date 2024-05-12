import { ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot, SplashScreen } from "expo-router"
import { useColorScheme } from "react-native"
import UserProvider from "../context/UserContext"
import { DarkNavigationTheme, LightNavigationTheme, fonts } from "../lib/themes"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    [fonts.overpass]: require("../assets/fonts/Overpass-Regular.ttf"),
    [fonts.overpassBold]: require("../assets/fonts/Overpass-Bold.ttf"),
    [fonts.overpassBlack]: require("../assets/fonts/Overpass-Black.ttf"),
    [fonts.overpassLight]: require("../assets/fonts/Overpass-Light.ttf"),
    [fonts.pixelify]: require("../assets/fonts/PixelifySans-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider
      value={colorScheme == "dark" ? DarkNavigationTheme : LightNavigationTheme}
    >
      <UserProvider>
        <Slot />
      </UserProvider>
    </ThemeProvider>
  )
}
