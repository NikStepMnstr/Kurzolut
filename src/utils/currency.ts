import type { CnbRate } from '../types/cnb.ts';

const moneyFormat = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const AMOUNT_PATTERN = /^(\d+\.?\d*|\.\d+)$/;

// A comma is always the decimal separator, so "1,000" reads as 1.
export const parseAmount = (input: string) => {
  const normalized = input.replaceAll(/\s/g, '').replace(',', '.');
  const amount = Number(normalized);

  return AMOUNT_PATTERN.test(normalized) && Number.isFinite(amount)
    ? amount
    : null;
};

export const convertFromCzk = (czk: number, { amount, rate }: CnbRate) =>
  (czk * amount) / rate;

export const formatMoney = (value: number) => moneyFormat.format(value);

export const formatCzkRate = ({ rate }: CnbRate) => `${rate.toFixed(3)} CZK`;

export const filterRates = (rates: CnbRate[], query: string) => {
  const normalized = query.trim().toLowerCase();

  return rates.filter(({ code, country, currency }) =>
    `${code} ${country} ${currency}`.toLowerCase().includes(normalized),
  );
};
