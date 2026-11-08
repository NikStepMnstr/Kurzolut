import type { ChangeEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { useDebouncedValue } from '../hooks/useDebouncedValue.ts';
import { fadeIn } from '../styles/animations.ts';
import type { CnbRate } from '../types/cnb.ts';
import {
  convertFromCzk,
  formatCzkRate,
  formatMoney,
  parseAmount,
} from '../utils/currency.ts';

const DEFAULT_AMOUNT = '1000';

const Card = styled.section`
  ${fadeIn}
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.m};
  padding: ${({ theme }) => theme.space.l};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.cream};

  @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    gap: ${({ theme }) => theme.space.l};
    padding: ${({ theme }) => theme.space.xl};
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.sky};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 500;
`;

const AmountInput = styled.input`
  width: 100%;
  min-height: ${({ theme }) => theme.controlHeight};
  padding: ${({ theme }) => `${theme.space.s} ${theme.space.m}`};
  border: 1px solid ${({ theme }) => theme.colors.cream};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.navy};
  font-size: ${({ theme }) => theme.fontSize.heading};
  font-weight: 600;
  font-variant-numeric: tabular-nums;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.sky};
    outline-offset: 2px;
  }
`;

const Result = styled.output`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.result};
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
`;

const ResultCode = styled.span`
  font-size: ${({ theme }) => theme.fontSize.heading};
  font-weight: 600;
  letter-spacing: 0;
`;

const RateNote = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.sky};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-variant-numeric: tabular-nums;
`;

type ConverterCardProps = {
  selectedRate: CnbRate;
};

export const ConverterCard = ({ selectedRate }: ConverterCardProps) => {
  const [input, setInput] = useState(DEFAULT_AMOUNT);
  const debouncedInput = useDebouncedValue(input);
  const czk = parseAmount(debouncedInput);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <Card>
      <Field>
        <Label htmlFor="czk-amount">Amount in CZK</Label>
        <AmountInput
          id="czk-amount"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={input}
          onChange={handleChange}
        />
      </Field>
      <Field>
        <Label htmlFor="conversion-result">Result in {selectedRate.code}</Label>
        <Result id="conversion-result" htmlFor="czk-amount">
          {czk === null ? '–' : formatMoney(convertFromCzk(czk, selectedRate))}{' '}
          <ResultCode>{selectedRate.code}</ResultCode>
        </Result>
      </Field>
      <RateNote>
        {selectedRate.amount} {selectedRate.code} ={' '}
        {formatCzkRate(selectedRate)}
      </RateNote>
    </Card>
  );
};
