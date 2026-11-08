import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/theme.ts';

export const renderWithProviders = (ui: ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>,
  );
};

export const stubFetch = (
  ...responses: { status?: number; text?: string }[]
) => {
  const fetchMock = vi.fn<typeof fetch>();

  responses.forEach(({ status = 200, text = '' }) => {
    fetchMock.mockResolvedValueOnce(new Response(text, { status }));
  });
  vi.stubGlobal('fetch', fetchMock);

  return fetchMock;
};
