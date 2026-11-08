import styled, { css, keyframes } from 'styled-components';

const ARROW_PATH = 'M-6 -5.5 L36 -5.5 L36 -13 L54 0 L36 13 L36 5.5 L-6 5.5 Z';

const pulse = keyframes`
  0%,
  100% {
    transform: scale(0.92);
  }

  50% {
    transform: scale(1);
  }
`;

const Svg = styled.svg<{ $isLoading: boolean }>`
  display: block;
  width: 100%;
  height: 100%;

  ${({ $isLoading }) =>
    $isLoading
      ? css`
          animation: ${pulse} 1400ms ease-in-out infinite;
        `
      : ''}
`;

type LogoProps = {
  isLoading?: boolean;
};

export const Logo = ({ isLoading = false }: LogoProps) => (
  <Svg
    $isLoading={isLoading}
    viewBox="24 24 112 112"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="24" y="24" width="112" height="112" rx="28" fill="#1D3557" />
    <path
      d={ARROW_PATH}
      fill="#E63946"
      stroke="#E63946"
      strokeWidth="2.5"
      strokeLinejoin="round"
      transform="translate(63 80) rotate(39.3)"
    />
    <path
      d={ARROW_PATH}
      fill="#F1FAEE"
      stroke="#F1FAEE"
      strokeWidth="2.5"
      strokeLinejoin="round"
      transform="translate(63 80) rotate(-39.3)"
    />
    <rect x="50" y="46" width="13" height="68" rx="6.5" fill="#F1FAEE" />
  </Svg>
);
