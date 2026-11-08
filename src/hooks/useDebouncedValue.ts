import { useEffect, useState } from 'react';

const DEBOUNCE_MS = 250;

export const useDebouncedValue = <T>(value: T) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounced;
};
