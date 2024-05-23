import { useState } from "react"
import { Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { updateDefaultCurrency } from "../../lib/db/profile"
import { supabase } from "../../lib/supabase"
import { useBillsStore } from "../../store/BillsStore"
import { useUserStore } from "../../store/UserStore"
import { Currency } from "../../types/currency"
import AnimatedStyleUpdateExample from "../AnimationExample"
import { FilledButton } from "../ui/buttons/FilledButton"
import LabelButtonRow from "../ui/buttons/LabelButtonRow"
import CurrencySelector from "../ui/modals/CurrencySelector"

export default function Profile() {
  const [currencyModalShown, setCurrencyModalShown] = useState(false)

  const userStore = useUserStore()!
  const billsStore = useBillsStore()

  const onCurrencySelected = async (currency: Currency) => {
    setCurrencyModalShown(false)
    const success = await updateDefaultCurrency(userStore.user!, currency)
    if (success) {
      userStore.updateDefaultCurrency(currency)
    } else {
      Alert.alert("Error", "Failed to update default currency")
    }
  }

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <LabelButtonRow
        buttonLabel={userStore.profile?.currency?.shortName ?? "Loading"}
        label="Default currency"
        onPress={() => setCurrencyModalShown(true)}
      />

      <FilledButton
        title="Sign out"
        onPress={() => {
          supabase.auth.signOut()
        }}
      />
      <CurrencySelector
        visible={currencyModalShown}
        initialValue={userStore.profile?.currency}
        onCancel={() => setCurrencyModalShown(false)}
        onCurrencySelected={onCurrencySelected}
      />
      <AnimatedStyleUpdateExample />
    </SafeAreaView>
  )
}
