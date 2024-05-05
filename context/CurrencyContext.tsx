import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Currency } from "../types/currency";
import { supabase } from "../lib/supabase";
import { Bill } from "../types/bill";

export type CurrencyState = {
  defaultCurrency: Currency;
  availableCurrencies: Currency[] | undefined;
  setDefaultCurrency: (currency: Currency) => void;
};

export const CurrencyContext = createContext<CurrencyState | undefined>(
  undefined,
);

type CurrencyProviderProps = {
  children: ReactNode;
};
export default function CurrencyProvider(props: CurrencyProviderProps) {
  const [defaultCurency, setDefaultCurency] = useState<Currency>(
    availableCurrencies[0],
  );
  const [availableCurrencies2, setAvailableCurrencies] = useState<
    Currency[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error, status } = await supabase
        .from("currencies")
        .select("*");

      const currencies = data as Currency[];
      if (error !== null) {
        return;
      }
      setAvailableCurrencies(currencies);
    };
    fetchData();
  }, []);

  const state: CurrencyState = {
    defaultCurrency: defaultCurency,
    setDefaultCurrency: setDefaultCurency,
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

const availableCurrencies: Currency[] = [
  { id: "0", name: "Polish Złoty", shortName: "pln" },
  {
    id: "1",
    name: "American Dolar",
    shortName: "usd",
    symbol: "$",
    symbolInFront: true,
  },
  {
    id: "2",
    name: "Euro",
    shortName: "eur",
    symbol: "€",
    symbolInFront: false,
  },
];
