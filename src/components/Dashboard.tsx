import { useState } from 'react';
import styled from 'styled-components';

import { useDebouncedValue } from '../hooks/useDebouncedValue.ts';
import { useSelectedRate } from '../hooks/useSelectedRate.ts';
import type { CnbRates } from '../types/cnb.ts';
import { filterRates } from '../utils/currency.ts';
import { ConverterCard } from './ConverterCard.tsx';
import { CurrencySearch } from './CurrencySearch.tsx';
import { Notice } from './Notice.tsx';
import { RateGrid } from './RateGrid.tsx';

const Sidebar = styled.div`
  grid-area: sidebar;
  position: sticky;
  top: ${({ theme }) => theme.space.s};
  z-index: 1;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.l};
  background: ${({ theme }) => theme.colors.cream};
  box-shadow: ${({ theme }) => `0 0 0 ${theme.space.s} ${theme.colors.cream}`};

  @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    top: ${({ theme }) => theme.space.l};
    box-shadow: none;
  }
`;

type DashboardProps = {
  data: CnbRates;
};

export const Dashboard = ({ data }: DashboardProps) => {
  const { selectedRate, selectCode } = useSelectedRate(data.rates);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query);

  return (
    <>
      <Sidebar>
        <ConverterCard selectedRate={selectedRate} />
        <CurrencySearch value={query} onChange={setQuery} />
      </Sidebar>
      <Notice date={data.date} />
      <RateGrid
        rates={filterRates(data.rates, debouncedQuery)}
        selectedCode={selectedRate.code}
        query={debouncedQuery}
        onSelect={selectCode}
      />
    </>
  );
};
