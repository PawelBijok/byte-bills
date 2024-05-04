export type Currency = {
  id: string;
  name: string;
  shortName: string;
  symbol?: string;
  symbolInFront?: boolean;
};

//TODO: this should be replaced with context probably
export const availableCurrencies: Currency[] = [
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
