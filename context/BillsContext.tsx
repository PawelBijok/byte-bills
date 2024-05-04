import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Bill } from "../types/bill";

//TODO: remove
const bill: Bill = {
  id: "bill1",
  currency: {
    id: "1",
    name: "American Dolar",
    shortName: "usd",
    symbol: "$",
    symbolInFront: true,
  },
  date: new Date(),
  categories: [
    { value: 13.9, name: "Alcohol" },
    { value: 143.21, name: "Groceries" },
    { value: 1750.99, name: "RTV" },
  ],
};

//TODO: remove
const initialBills: Bill[] = [
  { ...bill },
  { ...bill, id: "bill2" },
  { ...bill, id: "bill3" },
  { ...bill, id: "bill4" },
];

type BillActions = { type: "ADD"; bill: Bill } | { type: "REMOVE"; id: string };

export const BillsContext = createContext<Bill[]>(initialBills);

export const BillsDispatchContext = createContext<
  Dispatch<BillActions> | undefined
>(undefined);

type BillsProviderProps = {
  children: ReactNode;
};

export function BillsProvider(props: BillsProviderProps) {
  const [bills, dispatch] = useReducer(billsReducer, initialBills);

  return (
    <BillsContext.Provider value={bills}>
      <BillsDispatchContext.Provider value={dispatch}>
        {props.children}
      </BillsDispatchContext.Provider>
    </BillsContext.Provider>
  );
}
export function useBills() {
  return useContext(BillsContext);
}

export function useBillsDispatch() {
  return useContext(BillsDispatchContext);
}

function billsReducer(bills: Bill[], action: BillActions): Bill[] {
  switch (action.type) {
    case "ADD": {
      return [...bills, action.bill];
    }
    case "REMOVE": {
      return bills.filter((t) => {
        return t.id !== action.id;
      });
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
