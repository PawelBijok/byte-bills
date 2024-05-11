import { Redirect, Slot, SplashScreen, Stack } from "expo-router";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";

export default function AppLayout() {
  console.log("app layout");

  const userContext = useUser();
  if (userContext.isLoading) {
    console.log("there is some loading stuff");
    return;
  }

  SplashScreen.hideAsync();

  if (userContext.user === undefined) {
    console.log("nie działa ");
    return <Redirect href="/auth" />;
  }
  console.log(" działa XD ");

  return <Slot />;
}
