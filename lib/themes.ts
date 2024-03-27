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

export const onBgColor = (): string => (isDark() ? "#ffffff" : "#000000")

export const okColor = (): string => (isDark() ? "#ACF6BC" : "#17661F")

export const errorColor = (): string => (isDark() ? "#AA5C5C" : "#D77474")
