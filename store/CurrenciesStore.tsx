import { create } from "zustand"
import { Currency } from "../types/currency"

type CurrenciesStore = {
  availableCurrencies: Currency[] | undefined
  setAvailableCurrencies: (currencies: Currency[]) => void
}

export const useCurrenciesStore = create<CurrenciesStore>((set) => {
  return {
    availableCurrencies: undefined,
    setAvailableCurrencies: (currencies: Currency[]) => set({ availableCurrencies: currencies }),
  }
})
