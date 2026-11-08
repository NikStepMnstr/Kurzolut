import { useState } from 'react';

import type { CnbRate } from '../types/cnb.ts';

const STORAGE_KEY = 'kurzolut:currency';
const DEFAULT_CODE = 'EUR';

const readSavedCode = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveCode = (code: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    console.error('Storage unavailable');
  }
};

export const useSelectedRate = (rates: CnbRate[]) => {
  const [code, setCode] = useState(readSavedCode);

  const selectedRate =
    rates.find((rate) => rate.code === code) ??
    rates.find((rate) => rate.code === DEFAULT_CODE) ??
    rates[0];

  const selectCode = (nextCode: string) => {
    setCode(nextCode);
    saveCode(nextCode);
  };

  return { selectedRate, selectCode };
};
