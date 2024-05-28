import { User } from "@supabase/supabase-js"
import { Bill } from "../../types/bill"
import { supabase } from "../supabase"

export const getUserBills = async (user: User): Promise<Bill[] | undefined> => {
  const { data, error } = await supabase
    .from("bills")
    .select("id, date:created_at, categories, currency:currencies!inner(*)")
    .eq("user_id", user.id)
    .returns<Bill[]>()
  if (error !== null || data === null) {
    return undefined
  }
  data.forEach((bill) => {
    bill.date = new Date(bill.date)
  })
  return data
}

export const saveBill = async (bill: Bill): Promise<Bill | undefined> => {
  const { data, error } = await supabase
    .from("bills")
    .insert([
      {
        currency_id: bill.currency.id,
        categories: bill.categories,
      },
    ])
    .select()

  if (error !== null || data === null) {
    return undefined
  }
  return { ...bill, id: data[0].id }
}

export const deleteBill = async (billId: string): Promise<boolean> => {
  const { error } = await supabase.from("bills").delete().eq("id", billId)
  if (error !== null) {
    return false
  }

  return true
}
