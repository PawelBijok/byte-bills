import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { fonts } from "../lib/themes";
import { useUser } from "../context/UserContext";

export default function App() {
  const userContext = useUser();

  const [fontsLoaded] = useFonts({
    [fonts.overpass]: require("../assets/fonts/Overpass-Regular.ttf"),
    [fonts.overpassBold]: require("../assets/fonts/Overpass-Bold.ttf"),
    [fonts.overpassBlack]: require("../assets/fonts/Overpass-Black.ttf"),
    [fonts.overpassLight]: require("../assets/fonts/Overpass-Light.ttf"),
    [fonts.pixelify]: require("../assets/fonts/PixelifySans-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      if (userContext.user != null) {
        router.replace("/home");
      } else {
        router.replace("/auth");
      }
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, userContext.user]);

  if (!fontsLoaded) {
    return null;
  }
  return <View>{/*  TODO: Add loading someday */}</View>;
}
