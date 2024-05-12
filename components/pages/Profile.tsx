import { Session } from "@supabase/supabase-js"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useUser } from "../../context/UserContext"
import AnimatedStyleUpdateExample from "../AnimationExample"
import { FilledButton } from "../ui/buttons/FilledButton"
import LabelButtonRow from "../ui/buttons/LabelButtonRow"
import CurrencySelector from "../ui/modals/CurrencySelector"

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null)
  const [currencyModalShown, setCurrencyModalShown] = useState(false)

  const userContext = useUser()!

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <LabelButtonRow
        buttonLabel={userContext.profile?.currency?.shortName ?? "Loading"}
        label="Default currency"
        onPress={() => setCurrencyModalShown(true)}
      />

      <FilledButton title="Sign out" onPress={userContext.logOut} />
      <CurrencySelector
        visible={currencyModalShown}
        initialValue={userContext.profile?.currency}
        onCancel={() => setCurrencyModalShown(false)}
        onCurrencySelected={(currency) => {
          userContext.setDefaultCurrency(currency)
          setCurrencyModalShown(false)
        }}
      />
      <AnimatedStyleUpdateExample />
    </SafeAreaView>
  )
}
