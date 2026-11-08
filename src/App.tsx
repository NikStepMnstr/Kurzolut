import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './styles/GlobalStyle.ts';
import { theme } from './styles/theme.ts';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />X
      </ThemeProvider>
    </QueryClientProvider>
  );
}
