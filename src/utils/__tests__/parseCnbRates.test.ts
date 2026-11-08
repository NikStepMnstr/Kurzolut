import { mockRates, mockRatesText } from '../../test/fixtures.ts';
import { parseCnbRates } from '../parseCnbRates.ts';

describe('parseCnbRates', () => {
  it('parses the date and every rate', () => {
    expect(parseCnbRates(mockRatesText)).toEqual({
      date: '6 Nov 2026',
      rates: mockRates,
    });
  });

  it('handles Windows line endings', () => {
    const { rates } = parseCnbRates(mockRatesText.replaceAll('\n', '\r\n'));

    expect(rates[0].rate).toBe(24.345);
  });

  it('throws on empty text', () => {
    expect(() => parseCnbRates('')).toThrow();
  });

  it('throws on an HTML error page', () => {
    expect(() => parseCnbRates('<html>Service unavailable</html>')).toThrow();
  });

  it('throws on a header with no rates', () => {
    const input = `06 Nov 2026 #214
Country|Currency|Amount|Code|Rate`;

    expect(() => parseCnbRates(input)).toThrow();
  });

  it('throws on an invalid rate', () => {
    const input = `06 Nov 2026 #214
Country|Currency|Amount|Code|Rate
EMU|euro|1|EUR|n/a`;

    expect(() => parseCnbRates(input)).toThrow();
  });

  it('throws on an invalid amount', () => {
    const input = `06 Nov 2026 #214
Country|Currency|Amount|Code|Rate
EMU|euro|0|EUR|24.345`;

    expect(() => parseCnbRates(input)).toThrow();
  });

  it('throws on a missing code', () => {
    const input = `06 Nov 2026 #214
Country|Currency|Amount|Code|Rate
EMU|euro|1||24.345`;

    expect(() => parseCnbRates(input)).toThrow();
  });
});
