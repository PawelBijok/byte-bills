import { Currency } from "./currency"

export type Bill = {
  id?: string
  currency: Currency
  date: Date
  categories: Category[]
}

export type Category = {
  value: number
  name: string
}

export function getFullAmount(bill: Bill): number {
  let amount = 0
  bill.categories.forEach((cat) => {
    amount += cat.value
  })
  return amount
}

export function getMostPopularCategoriesNames(bills: Bill[], max?: number): string[] {
  let categoriesNames = new Map<string, number>()
  bills.forEach((bill) => {
    bill.categories.forEach((category) => {
      const items = categoriesNames.get(category.name)
      items === undefined ? categoriesNames.set(category.name, 1) : categoriesNames.set(category.name, items + 1)
    })
  })

  const sorted = [...categoriesNames.entries()].sort((a, b) => b[1] - a[1]).map((a) => a[0])

  if (max !== undefined) return sorted.slice(0, max)

  return sorted
}
