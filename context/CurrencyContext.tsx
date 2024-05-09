import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Currency } from "../types/currency";
import { supabase, supabaseSession } from "../lib/supabase";

export type CurrencyState = {
  defaultCurrency: Currency | undefined;
  availableCurrencies: Currency[] | undefined;
  setDefaultCurrency: (currency: Currency) => void;
};

export const CurrencyContext = createContext<CurrencyState | undefined>(
  undefined,
);

type CurrencyProviderProps = {
  children: ReactNode;
};
export default function CurrencgProvider(props: CurrencyProviderProps) {
  const [defaultCurency, setDefaultCurency] = useState<Currency | undefined>(
    undefined,
  );
  const [availableCurrencies2, setAvailableCurrencies] = useState<
    Currency[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchAvailableCurrencies = async () => {
      const { data, error } = await supabase.from("currencies").select("*");

      const currencies = data as Currency[];
      if (error !== null) {
        return;
      }
      setAvailableCurrencies(currencies);
    };
    const fetchDefaultCurrency = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("currency:currencies!inner(*)")
        .eq("id", supabaseSession?.user.id)
        .returns<{ currency: Currency }[]>()
        .single();

      if (error !== null || data === null) {
        return;
      }
      setDefaultCurency(data.currency);
    };
    fetchAvailableCurrencies();
    fetchDefaultCurrency();
  }, []);

  const onSetDefaultCurrency = async (currency: Currency) => {
    const { error } = await supabase
      .from("profiles")
      .update({ default_currency_id: currency.id })
      .eq("id", supabaseSession!.user.id);
    if (error !== null) {
      return;
    }
    setDefaultCurency(currency);
  };

  const state: CurrencyState = {
    defaultCurrency: defaultCurency,
    setDefaultCurrency: onSetDefaultCurrency,
    availableCurrencies: availableCurrencies2,
  };

  return (
    <CurrencyContext.Provider value={state}>
      {props.children}
    </CurrencyContext.Provider>
  );
}
export function useCurrency() {
  return useContext(CurrencyContext);
}
