import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export const LightNavigationTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#7663EE",
  },
};
export const DarkNavigationTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#7F6EE4",
  },
};

export const isDark = (): boolean => useColorScheme() === "dark";
export const overlayBgColor = (): string => (isDark() ? "#131313" : "#ffffff");
export const onBgColor = (): string => (isDark() ? "#ffffff" : "#000000");
export const onBgSubtleColor = (): string => (isDark() ? "#878787" : "#646464");
export const okColor = (): string => (isDark() ? "#ACF6BC" : "#17661F");
export const errorColor = (): string => (isDark() ? "#AA5C5C" : "#D77474");
export const accentColor = (): string => (isDark() ? "#7F6EE4" : "#7663EE");
export const onAccentColor = (): string => (isDark() ? "#000000" : "#ffffff");

export const fonts = {
  overpassBold: "Overpass-Bold",
  overpassBlack: "Overpass-Black",
  overpassLight: "Overpass-Light",
  overpass: "Overpass",
  pixelify: "Pixelify",
};
