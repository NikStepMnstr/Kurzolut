import { useQuery } from '@tanstack/react-query';

import { parseCnbRates } from '../utils/parseCnbRates.ts';

const CNB_RATES_URL = '/api/cnb';

const fetchCnbRates = async () => {
  const response = await fetch(CNB_RATES_URL, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`CNB rates request failed: ${response.status}`);
  }

  return parseCnbRates(await response.text());
};

export const useCnbRates = () =>
  useQuery({
    queryKey: ['cnb-rates'],
    queryFn: fetchCnbRates,
  });
