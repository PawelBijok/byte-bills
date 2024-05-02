import { View } from "react-native";
import { FilledButton } from "../ui/buttons/FilledButton";
import { router } from "expo-router";
import CategotyAmountRow from "../bills/CategoryAmountRow";

export default function AddNewBill() {
  const canDismiss = router.canGoBack();
  return <View style={{
    flex: 1,
    padding: 15,
  }}>
    <View
      style={{
        flexGrow: 1,
        gap: 15
      }}

    >
      <CategotyAmountRow />
      <CategotyAmountRow />
      <CategotyAmountRow />
    </View>
    <FilledButton title="Save" onPress={canDismiss ? () => {
      router.back();
    } : undefined} />
  </View>
}
