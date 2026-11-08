import styled from 'styled-components';

import { fadeIn } from '../styles/animations.ts';
import type { CnbRate } from '../types/cnb.ts';
import { RateTile } from './RateTile.tsx';

const List = styled.ul`
  ${fadeIn}
  grid-area: grid;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.space.m};
  align-content: start;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EmptyMessage = styled.p`
  grid-area: grid;
  margin: 0;
`;

type RateGridProps = {
  rates: CnbRate[];
  selectedCode: string;
  query: string;
  onSelect: (code: string) => void;
};

export const RateGrid = ({
  rates,
  selectedCode,
  query,
  onSelect,
}: RateGridProps) =>
  rates.length === 0 ? (
    <EmptyMessage>No currency matches "{query.trim()}".</EmptyMessage>
  ) : (
    <List>
      {rates.map((rate) => (
        <li key={rate.code}>
          <RateTile
            rate={rate}
            isSelected={rate.code === selectedCode}
            onSelect={onSelect}
          />
        </li>
      ))}
    </List>
  );
