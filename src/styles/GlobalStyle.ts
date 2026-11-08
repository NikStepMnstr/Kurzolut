import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.navy};
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: ${({ theme }) => theme.fontSize.body};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  button,
  input {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;
