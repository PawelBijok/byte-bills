import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { supabase } from "../lib/supabase"
import { Currency } from "../types/currency"

export type CurrencyState = {
  availableCurrencies: Currency[] | undefined
}

export const CurrencyContext = createContext<CurrencyState | undefined>(
  undefined
)

type CurrencyProviderProps = {
  children: ReactNode
}
export default function CurrencyProvider(props: CurrencyProviderProps) {
  const [availableCurrencies, setAvailableCurrencies] = useState<
    Currency[] | undefined
  >(undefined)

  useEffect(() => {
    const fetchAvailableCurrencies = async () => {
      const { data, error } = await supabase.from("currencies").select("*")

      const currencies = data as Currency[]
      if (error !== null) {
        return
      }
      setAvailableCurrencies(currencies)
    }
    fetchAvailableCurrencies()
  }, [])

  const state: CurrencyState = {
    availableCurrencies: availableCurrencies,
  }

  return (
    <CurrencyContext.Provider value={state}>
      {props.children}
    </CurrencyContext.Provider>
  )
}
export function useCurrency() {
  return useContext(CurrencyContext)
}
