import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import AddNewBill from "../../../components/pages/AddNewBill"

export default function NewBillPage() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["bottom"]}
    >
      <StatusBar style="light" />
      <AddNewBill />
    </SafeAreaView>
  )
}
