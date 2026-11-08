import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { createQueryClient } from './api/queryClient.ts';
import { App } from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import { theme } from './styles/theme.ts';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root not found');
}

const queryClient = createQueryClient();

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
