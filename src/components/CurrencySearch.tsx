import type { ChangeEvent } from 'react';
import styled from 'styled-components';

import { fadeIn } from '../styles/animations.ts';

const Container = styled.div`
  ${fadeIn}
  display: flex;
  flex-direction: column;
`;

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  min-height: ${({ theme }) => theme.controlHeight};
  padding: ${({ theme }) => `${theme.space.s} ${theme.space.m}`};
  border: 1px solid ${({ theme }) => theme.colors.steel};
  border-radius: ${({ theme }) => theme.radius};
  background: transparent;
  color: ${({ theme }) => theme.colors.navy};

  &::placeholder {
    color: ${({ theme }) => theme.colors.navy};
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.navy};
    outline-offset: 2px;
  }
`;

type CurrencySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CurrencySearch = ({ value, onChange }: CurrencySearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Container>
      <VisuallyHiddenLabel htmlFor="currency-search">
        Search currencies
      </VisuallyHiddenLabel>
      <Input
        id="currency-search"
        type="search"
        placeholder="Search currency or country"
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
};
