export type CnbRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type CnbRates = {
  date: string;
  rates: CnbRate[];
};
