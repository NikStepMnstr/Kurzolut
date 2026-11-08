import { act, renderHook } from '@testing-library/react';

import { mockRates } from '../../test/fixtures.ts';
import { useSelectedRate } from '../useSelectedRate.ts';

describe('useSelectedRate', () => {
  it('selects EUR by default', () => {
    const { result } = renderHook(() => useSelectedRate(mockRates));

    expect(result.current.selectedRate.code).toBe('EUR');
  });

  it('restores a saved currency', () => {
    localStorage.setItem('kurzolut:currency', 'USD');

    const { result } = renderHook(() => useSelectedRate(mockRates));

    expect(result.current.selectedRate.code).toBe('USD');
  });

  it('falls back to EUR when the saved currency is unavailable', () => {
    localStorage.setItem('kurzolut:currency', 'XXX');

    const { result } = renderHook(() => useSelectedRate(mockRates));

    expect(result.current.selectedRate.code).toBe('EUR');
  });

  it('falls back to the first rate when EUR is unavailable', () => {
    const [, huf, usd] = mockRates;

    const { result } = renderHook(() => useSelectedRate([huf, usd]));

    expect(result.current.selectedRate.code).toBe('HUF');
  });

  it('selects and saves a currency', () => {
    const { result } = renderHook(() => useSelectedRate(mockRates));

    act(() => {
      result.current.selectCode('USD');
    });

    expect(result.current.selectedRate.code).toBe('USD');
    expect(localStorage.getItem('kurzolut:currency')).toBe('USD');
  });

  it('selects EUR when reading storage fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    const { result } = renderHook(() => useSelectedRate(mockRates));

    expect(result.current.selectedRate.code).toBe('EUR');
  });

  it('still selects the currency when saving fails', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    const { result } = renderHook(() => useSelectedRate(mockRates));

    act(() => {
      result.current.selectCode('USD');
    });

    expect(result.current.selectedRate.code).toBe('USD');
  });
});
