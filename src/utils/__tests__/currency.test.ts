import { mockRates } from '../../test/fixtures.ts';
import {
  convertFromCzk,
  filterRates,
  formatCzkRate,
  formatMoney,
  parseAmount,
} from '../currency.ts';

const [eur, huf] = mockRates;

describe('parseAmount', () => {
  it.each([
    ['1000', 1000],
    ['1 000', 1000],
    ['12,5', 12.5],
    ['12.5', 12.5],
    ['1,000', 1],
    ['.5', 0.5],
    ['5.', 5],
    ['0', 0],
  ])('reads %s', (input, expected) => {
    expect(parseAmount(input)).toBe(expected);
  });

  it.each([
    '',
    '   ',
    'abc',
    '-5',
    '+5',
    '.',
    '1.2.3',
    '1,000,000',
    'Infinity',
    '1e3',
    '0x10',
  ])('rejects "%s"', (input) => {
    expect(parseAmount(input)).toBeNull();
  });
});

describe('convertFromCzk', () => {
  it('divides by the rate for a single unit', () => {
    expect(convertFromCzk(1000, eur)).toBeCloseTo(41.076, 3);
  });

  it('accounts for the unit amount CNB quotes', () => {
    expect(convertFromCzk(1000, huf)).toBeCloseTo(14940.98, 2);
  });
});

describe('formatMoney', () => {
  it('uses two decimals and thousands separators', () => {
    expect(formatMoney(14940.984)).toBe('14,940.98');
  });
});

describe('formatCzkRate', () => {
  it('uses three decimals', () => {
    expect(formatCzkRate({ ...eur, rate: 24.3 })).toBe('24.300 CZK');
  });
});

describe('filterRates', () => {
  it('finds a rate by code', () => {
    expect(filterRates(mockRates, 'eur')).toEqual([eur]);
  });

  it('finds a rate by country', () => {
    expect(filterRates(mockRates, 'HUNGARY')).toEqual([huf]);
  });

  it('finds a rate by currency name', () => {
    expect(filterRates(mockRates, 'forint')).toEqual([huf]);
  });

  it('ignores surrounding spaces', () => {
    expect(filterRates(mockRates, '  emu ')).toEqual([eur]);
  });

  it('returns every rate for an empty query', () => {
    expect(filterRates(mockRates, '')).toEqual(mockRates);
  });

  it('returns nothing when no rate matches', () => {
    expect(filterRates(mockRates, 'nothing')).toEqual([]);
  });
});
