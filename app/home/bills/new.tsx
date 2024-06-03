import { useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import AddNewBill from "../../../components/pages/AddNewBill"

type NewBillPageParams = {
  date?: Date
}

export default function NewBillPage() {
  const params: NewBillPageParams = useLocalSearchParams()
  console.log(params)
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["bottom"]}
    >
      <StatusBar style="light" />
      <AddNewBill date={params.date} />
    </SafeAreaView>
  )
}
