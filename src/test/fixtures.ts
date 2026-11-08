import type { CnbRate } from '../types/cnb.ts';

export const mockRatesText = `06 Nov 2026 #214
Country|Currency|Amount|Code|Rate
EMU|euro|1|EUR|24.345
Hungary|forint|100|HUF|6.693
USA|dollar|1|USD|21.804`;

export const mockRates: CnbRate[] = [
  { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 24.345 },
  {
    country: 'Hungary',
    currency: 'forint',
    amount: 100,
    code: 'HUF',
    rate: 6.693,
  },
  { country: 'USA', currency: 'dollar', amount: 1, code: 'USD', rate: 21.804 },
];
