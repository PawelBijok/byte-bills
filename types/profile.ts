import { Currency } from "./currency"

export type Profile = {
  id: string
  fullName?: string
  username?: string
  currency?: Currency
  avatarUrl?: string
}
