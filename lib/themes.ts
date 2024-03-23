import { DarkTheme, DefaultTheme } from "@react-navigation/native"
import { useColorScheme } from "react-native"

export const LightNavigationTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
}
export const DarkNavigationTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
}

export const isDark = (): boolean => useColorScheme() === "dark"
