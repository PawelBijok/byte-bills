import { router } from "expo-router"
import { useMemo, useState } from "react"
import { ActivityIndicator, Alert, FlatList, SafeAreaView, View } from "react-native"
import { getUserBills } from "../../lib/db/bills"
import { useBillsStore } from "../../store/BillsStore"
import { useUserStore } from "../../store/UserStore"
import { getFullAmount } from "../../types/bill"
import BillEntryItem from "../bills/BillEntryItem"
import MonthSummary from "../bills/MonthSummary"
import MonthsSelector from "../bills/MonthsSelector"
import { FilledButton } from "../ui/buttons/FilledButton"
import { Gap } from "../ui/common/Gap"

export default function Bills() {
  let now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const userStore = useUserStore()
  const billsStore = useBillsStore()
  const [loading, setLoading] = useState(true)

  useMemo(() => {
    const getBills = async () => {
      const bills = await getUserBills(userStore.user!)
      setLoading(false)
      if (bills === undefined) {
        Alert.alert("Error", "Failed to load bills")
        return
      }
      billsStore.addBills(bills)
    }
    getBills()
  }, [])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const [month, setMonth] = useState<number>(currentMonth)
  let bills = useBillsStore().bills.filter((bill) => {
    return bill.date.getMonth() == month
  })

  const sum = bills.length > 0 ? bills.map((bill) => getFullAmount(bill)).reduce((s, a) => s + a) : 0

  const [year, setYear] = useState<number>(currentYear)

  function changeMonth(next: boolean) {
    const currentMonth = month
    const currentYear = year
    if (next) {
      if (currentMonth === months.length - 1) {
        setMonth(0)
        setYear(currentYear + 1)
      } else {
        setMonth(currentMonth + 1)
      }
    } else {
      if (currentMonth === 0) {
        setMonth(months.length - 1)
        setYear(currentYear - 1)
      } else {
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
          onPrevious={() => {
            changeMonth(false)
          }}
          onNext={() => {
            changeMonth(true)
          }}
        />
        <Gap size="xl" />
        {loading && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        )}
        {!loading && bills.length !== 0 && (
          <FlatList
            data={bills}
            ItemSeparatorComponent={() => <Gap size="l" />}
            renderItem={({ item }) => <BillEntryItem bill={item} />}
            keyExtractor={(item) => item.id}
          />
        )}

        <FilledButton
          title="Add new bill"
          onPress={() => {
            router.push("/home/bills/new")
          }}
          icon={{
            name: "plus",
            type: "font-awesome",
            size: 15,
          }}
        />
        <Gap size="l" />
        <MonthSummary currency="pln" sum={sum} />
      </View>
    </SafeAreaView>
  )
}
