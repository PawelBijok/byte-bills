import { User } from "@supabase/supabase-js"
import { Bill } from "../../types/bill"
import { supabase } from "../supabase"
const bill: Bill = {
  id: "bill1",
  currency: {
    id: "1",
    name: "American Dolar",
    shortName: "usd",
    symbol: "$",
    symbolInFront: true,
  },
  date: new Date(),
  categories: [
    { value: 143.21, name: "Groceries" },
    { value: 1750.99, name: "RTV" },
  ],
}
const initialBills: Bill[] = [{ ...bill }, { ...bill, id: "bill2" }, { ...bill, id: "bill3" }, { ...bill, id: "bill4" }]

export const getUserBills = async (user: User): Promise<Bill[] | undefined> => {
  const { data, error } = await supabase
    .from("bills")
    .select("id, date:created_at, categories, currency:currencies!inner(*)")
    .eq("user_id", user.id)
    .returns<Bill[]>()
  if (error !== null || data === null) {
    return undefined
  }
  return data
}
