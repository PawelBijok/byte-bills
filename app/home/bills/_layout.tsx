import { Stack } from "expo-router";

export default function Layout() {
  return (<Stack

    screenOptions={{
      headerTitleStyle: { fontFamily: "Pixelify", fontSize: 20 },
    }}
  >
    <Stack.Screen
      name="index"
      options={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="new"
      options={{
        presentation: 'modal',
        title: "Add new bill"
      }}
    />
  </Stack >);

}
