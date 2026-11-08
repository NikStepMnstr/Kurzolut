import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.m};
`;

const RetryButton = styled.button`
  min-height: ${({ theme }) => theme.controlHeight};
  padding: ${({ theme }) => `${theme.space.s} ${theme.space.l}`};
  border: 0;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.cream};
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.navy};
    outline-offset: 2px;
  }
`;

type ErrorMessageProps = {
  isRetrying: boolean;
  onRetry: () => void;
};

export const ErrorMessage = ({ isRetrying, onRetry }: ErrorMessageProps) => (
  <Container>
    <p>We couldn't load the exchange rates from the Czech National Bank.</p>
    <RetryButton type="button" disabled={isRetrying} onClick={onRetry}>
      {isRetrying ? 'Trying again…' : 'Try again'}
    </RetryButton>
  </Container>
);
