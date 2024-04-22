import { SafeAreaView, View } from "react-native"
import BillEntryItem from "../bills/BillEntryItem"
import MonthSummary from "../bills/MonthSummary"
import MonthsSelector from "../bills/MonthsSelector"
import { Gap } from "../ui/common/Gap"

export default function Bills() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 15 }}>
        <MonthsSelector />
        <Gap size="xl" />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 15,
          }}
        >
          <BillEntryItem />
          <BillEntryItem />
          <BillEntryItem />
        </View>
        <MonthSummary />
      </View>
    </SafeAreaView>
  )
}
