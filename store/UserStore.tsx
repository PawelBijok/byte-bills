import { User } from "@supabase/supabase-js"
import { create } from "zustand"
import { Currency } from "../types/currency"
import { Profile } from "../types/profile"

type UserStore = {
  user?: User
  profile?: Profile
  setUser: (user?: User) => void
  setProfile: (profile?: Profile) => void
  updateDefaultCurrency: (currency: Currency) => void
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: undefined,
    profile: undefined,
    setUser: (user?: User) => set({ user }),
    setProfile: (profile?: Profile) => set({ profile }),
    updateDefaultCurrency: (currency: Currency) => {
      set((state) => {
        if (state.profile === undefined) {
          return state
        }
        return { ...state, profile: { ...state.profile, currency: currency } }
      })
    },
  }
})
