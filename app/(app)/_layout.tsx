import { Redirect, Slot, SplashScreen } from "expo-router"
import { useUser } from "../../context/UserContext"

export default function AppLayout() {
  const userContext = useUser()
  if (userContext.isLoading) {
    return
  }

  SplashScreen.hideAsync()

  if (userContext.user === undefined) {
    return <Redirect href="/auth" />
  }

  return <Slot />
}
