import { User } from "@supabase/supabase-js"
import { Currency } from "../../types/currency"
import { Profile } from "../../types/profile"
import { supabase } from "../supabase"

export const getProfile = async (user: User): Promise<Profile | undefined> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, fullName:full_name, avatarUrl:avatar_url, currency:currencies!inner(*)")
    .eq("id", user.id)
    .returns<Profile[]>()
    .single()
  if (error || data === null) {
    return undefined
  }
  return data
}

export const updateDefaultCurrency = async (user: User, currency: Currency): Promise<boolean> => {
  const { error } = await supabase.from("profiles").update({ default_currency_id: currency.id }).eq("id", user.id)
  if (error !== null) {
    return false
  }
  return true
}
