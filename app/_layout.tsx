import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { Session } from "@supabase/supabase-js"
import { Stack, router } from "expo-router"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import { supabase } from "../lib/supabase"

const LightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
}
const CustomDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
}
export default function RootLayout() {
  useEffect(() => {
    function handleSession(session: Session | null) {
      if (session) {
        router.replace("/")
      } else {
        router.replace("/auth")
      }
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session)
    })
  }, [])

  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme == "dark" ? CustomDarkTheme : LightTheme}>
      <Stack />
    </ThemeProvider>
  )
}
