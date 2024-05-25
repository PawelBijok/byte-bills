import { create } from "zustand"
import { Bill } from "../types/bill"

type BillsStore = {
  bills: Bill[]
  addBill: (bill: Bill) => void
  addBills: (bills: Bill[]) => void
}

export const useBillsStore = create<BillsStore>((set) => {
  return {
    bills: [],
    addBill: (bill: Bill) => {
      set((state) => {
        return { bills: [...state.bills, bill] }
      })
    },
    addBills: (bills: Bill[]) => {
      set((state) => {
        return { bills: [...state.bills, ...bills] }
      })
    },
  }
})
