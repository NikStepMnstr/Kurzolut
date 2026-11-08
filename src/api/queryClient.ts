import { QueryClient } from '@tanstack/react-query';

const ONE_HOUR = 60 * 60 * 1000;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: ONE_HOUR,
      },
    },
  });
