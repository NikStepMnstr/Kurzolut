import styled, { css } from 'styled-components';

import type { CnbRate } from '../types/cnb.ts';
import { formatCzkRate } from '../utils/currency.ts';

const Tile = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;
  height: 100%;
  min-height: ${({ theme }) => theme.controlHeight};
  padding: ${({ theme }) => theme.space.m};
  border: 1px solid ${({ theme }) => theme.colors.sky};
  border-radius: ${({ theme }) => theme.radius};
  background: transparent;
  color: ${({ theme }) => theme.colors.navy};
  text-align: left;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.steel};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.navy};
    outline-offset: 2px;
  }

  ${({ $isSelected, theme }) =>
    $isSelected
      ? css`
          border-color: ${theme.colors.navy};
          background: ${theme.colors.navy};
          color: ${theme.colors.cream};

          &:hover {
            border-color: ${theme.colors.navy};
          }
        `
      : ''}
`;

const TopRow = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Code = styled.span`
  font-size: ${({ theme }) => theme.fontSize.heading};
  font-weight: 700;
`;

const SelectedDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.red};
`;

const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const Rate = styled.span`
  margin-top: auto;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

type RateTileProps = {
  rate: CnbRate;
  isSelected: boolean;
  onSelect: (code: string) => void;
};

export const RateTile = ({ rate, isSelected, onSelect }: RateTileProps) => {
  const handleClick = () => {
    onSelect(rate.code);
  };

  return (
    <Tile
      type="button"
      $isSelected={isSelected}
      aria-pressed={isSelected}
      onClick={handleClick}
    >
      <TopRow>
        <Code>{rate.code}</Code>
        {isSelected ? <SelectedDot /> : null}
      </TopRow>
      <Name>
        {rate.country} · {rate.currency}
      </Name>
      <Rate>
        {formatCzkRate(rate)}
        {rate.amount === 1 ? '' : ` per ${rate.amount}`}
      </Rate>
    </Tile>
  );
};
