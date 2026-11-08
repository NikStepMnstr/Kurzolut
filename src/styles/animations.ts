import { css, keyframes } from 'styled-components';

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }
`;

export const fadeIn = css`
  animation: ${fadeInKeyframes} 300ms ease;
`;
