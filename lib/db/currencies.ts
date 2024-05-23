import { Currency } from "../../types/currency"
import { supabase } from "../supabase"

export const getCurrencies = async (): Promise<Currency[] | undefined> => {
  const { data, error } = await supabase.from("currencies").select("*").returns<Currency[]>()
  if (error !== null || data === null) {
    return undefined
  }
  return data
}
