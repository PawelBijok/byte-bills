import { Currency } from "./currency";

export type Bill = {
  id: string;
  currency: Currency;
  date: Date;
  categories: Category[];
};

export type Category = {
  value: number;
  name: string;
};

export function getFullAmount(bill: Bill): number {
  let amount = 0;
  bill.categories.forEach((cat) => {
    amount += cat.value;
  });
  return amount;
}
