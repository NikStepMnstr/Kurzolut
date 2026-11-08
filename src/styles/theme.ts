import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  // https://coolors.co/palette/e63946-f1faee-a8dadc-457b9d-1d3557
  colors: {
    navy: '#1d3557',
    steel: '#457b9d',
    sky: '#a8dadc',
    cream: '#f1faee',
    red: '#e63946',
  },
  fontSize: {
    small: '0.875rem',
    body: '1rem',
    heading: '1.25rem',
    result: 'clamp(2rem, 7vw, 3rem)',
  },
  space: {
    xs: '0.25rem',
    s: '0.5rem',
    m: '0.75rem',
    l: '1rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  radius: '12px',
  controlHeight: '44px',
  contentMaxWidth: '1200px',
  breakpoint: {
    desktop: '900px',
  },
};
