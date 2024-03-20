import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const LightNavigationTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};
export const DarkNavigationTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
};
