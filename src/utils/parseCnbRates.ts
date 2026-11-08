import type { CnbRate, CnbRates } from '../types/cnb.ts';

const parseRateLine = (line: string): CnbRate => {
  const [country, currency, amount, code, rate] = line
    .split('|')
    .map((part) => part.trim());
  const parsed = {
    country,
    currency,
    amount: Number(amount),
    code,
    rate: Number(rate),
  };

  if (!code || !(parsed.amount > 0) || !(parsed.rate > 0)) {
    throw new Error(`Unexpected CNB rate line: ${line}`);
  }

  return parsed;
};

export const parseCnbRates = (text: string): CnbRates => {
  const [header, , ...rateLines] = text.trim().split(/\r?\n/);
  const dateMatch = /^(\d{1,2}) (\w+ \d{4})/.exec(header);

  if (!dateMatch || rateLines.length === 0) {
    throw new Error('Unexpected CNB rates format');
  }

  return {
    date: `${Number(dateMatch[1])} ${dateMatch[2]}`,
    rates: rateLines.map(parseRateLine),
  };
};
