import { act, renderHook } from '@testing-library/react';

import { useDebouncedValue } from '../useDebouncedValue.ts';

describe('useDebouncedValue', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('updates only after the delay has passed', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value),
      { initialProps: { value: 'first' } },
    );

    rerender({ value: 'second' });

    act(() => {
      vi.advanceTimersByTime(249);
    });
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('second');
  });
});
