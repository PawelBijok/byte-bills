import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useCurrency } from "../../context/CurrencyContext"
import { useUser } from "../../context/UserContext"
import { supabase } from "../../lib/supabase"
import { FilledButton } from "../ui/buttons/FilledButton"
import LabelButtonRow from "../ui/buttons/LabelButtonRow"
import CurrencySelector from "../ui/modals/CurrencySelector"

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [website, setWebsite] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [session, setSession] = useState<Session | null>(null)
  const [currencyModalShown, setCurrencyModalShown] = useState(false)

  const currencyContext = useCurrency()!
  const userContext = useUser()!

  useEffect(() => {
    console.log(JSON.stringify(userContext.profile))
  }, [userContext.profile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from("profiles").upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <LabelButtonRow
        buttonLabel={userContext.profile?.currency?.shortName ?? "Loading"}
        label="Default currency"
        onPress={() => setCurrencyModalShown(true)}
      />

      <View style={styles.verticallySpaced}>
        <FilledButton title="Sign out" onPress={userContext.logOut} />
      </View>
      <CurrencySelector
        visible={currencyModalShown}
        initialValue={userContext.profile?.currency}
        onCancel={() => setCurrencyModalShown(false)}
        onCurrencySelected={(currency) => {
          userContext.setDefaultCurrency(currency)
          setCurrencyModalShown(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})
