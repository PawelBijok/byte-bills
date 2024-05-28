import { create } from "zustand"
import { Bill } from "../types/bill"

type BillsStore = {
  bills: Bill[]
  addBill: (bill: Bill) => void
  addBills: (bills: Bill[]) => void
  removeBill: (billId: string) => void
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
    removeBill: (billId: string) => {
      set((state) => {
        return { bills: state.bills.filter((bill) => bill.id !== billId) }
      })
    },
  }
})
