import { ReactNode, createContext, useContext, useState } from "react";
import { Currency, availableCurrencies } from "../types/currency";

export type CurrencyState = {
  defaultCurrency: Currency;
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
