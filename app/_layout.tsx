import { ThemeProvider } from "@react-navigation/native";
import { Slot, SplashScreen, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, useColorScheme } from "react-native";
import * as supabase from "../lib/supabase";
import {
  DarkNavigationTheme,
  LightNavigationTheme,
  fonts,
} from "../lib/themes";
import { useFonts } from "expo-font";
import { Session } from "@supabase/supabase-js";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  useMemo(() => {
    supabase.initialize((sesh) => {
      setInitialized(true);
      setSession(sesh);
    });
  }, []);

  const [fontsLoaded] = useFonts({
    [fonts.overpass]: require("../assets/fonts/Overpass-Regular.ttf"),
    [fonts.overpassBold]: require("../assets/fonts/Overpass-Bold.ttf"),
    [fonts.overpassLight]: require("../assets/fonts/Overpass-Light.ttf"),
    [fonts.pixelify]: require("../assets/fonts/PixelifySans-Regular.ttf"),
  });

  useEffect(() => {
    if (initialized && fontsLoaded) {
      if (session != null) {
        router.replace("/home");
      } else {
        router.replace("/auth");
      }
      SplashScreen.hideAsync();
    }
  }, [initialized, fontsLoaded, session]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme == "dark" ? DarkNavigationTheme : LightNavigationTheme}
    >
      <Slot />
    </ThemeProvider>
  );
}
