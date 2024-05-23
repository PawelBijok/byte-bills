import { create } from "zustand"
import { Bill } from "../types/bill"

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
    { value: 143.21, name: "Groceries" },
    { value: 1750.99, name: "RTV" },
  ],
}
type BillsStore = {
  bills: Bill[]
  addBill: (bill: Bill) => void
}

export const useBillsStore = create<BillsStore>((set) => {
  //TODO: remove
  const initialBills: Bill[] = [
    { ...bill },
    { ...bill, id: "bill2" },
    { ...bill, id: "bill3" },
    { ...bill, id: "bill4" },
  ]
  return {
    bills: initialBills,
    addBill: (bill: Bill) => {
      set((state) => {
        return { bills: [...state.bills, bill] }
      })
    },
  }
})
