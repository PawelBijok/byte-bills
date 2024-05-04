import { ReactNode, createContext, useContext, useState } from "react";
import { Currency } from "../types/currency";

export type CurrencyState = {
  defaultCurrency: Currency;
  availableCurrencies: Currency[];
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

  const state: CurrencyState = {
    defaultCurrency: defaultCurency,
    setDefaultCurrency: setDefaultCurency,
    availableCurrencies: availableCurrencies,
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
