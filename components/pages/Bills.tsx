import { SafeAreaView, View } from "react-native"
import BillEntryItem from "../bills/BillEntryItem"
import MonthSummary from "../bills/MonthSummary"
import MonthsSelector from "../bills/MonthsSelector"
import { Gap } from "../ui/common/Gap"
import { useState } from "react"
import { FilledButton } from "../ui/buttons/FilledButton"
import { router } from "expo-router"

export default function Bills() {
  let now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemer", "December",]

  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)

  function changeMonth(next: boolean) {
    const currentMonth = month;
    const currentYear = year;
    if (next) {
      if (currentMonth === months.length - 1) {
        setMonth(0)
        setYear(currentYear + 1)
      }
      else {
        setMonth(currentMonth + 1)
      }
    }
    else {
      if (currentMonth === 0) {
        setMonth(months.length - 1)
        setYear(currentYear - 1)
      }
      else {

        setMonth(currentMonth - 1)
      }
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 15 }}>
        <MonthsSelector
          month={months[month]}
          year={year}
          onPrevious={() => { changeMonth(false) }}
          onNext={() => { changeMonth(true) }}

        />
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

        <FilledButton title="Add new bill" onPress={() => {

          router.push("/home/bills/new")
        }} loading={false} />
        <Gap size="l" />
        <MonthSummary />
      </View>
    </SafeAreaView>
  )
}
