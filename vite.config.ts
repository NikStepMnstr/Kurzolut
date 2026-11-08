import babel from '@rolldown/plugin-babel';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const CNB_RATES_PATH =
  '/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const proxy = {
  '/api/cnb': {
    target: 'https://www.cnb.cz',
    changeOrigin: true,
    rewrite: () => CNB_RATES_PATH,
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ plugins: ['babel-plugin-styled-components'] })],
  server: { proxy },
  preview: { proxy },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: './src/test/setup.ts',
    unstubGlobals: true,
    restoreMocks: true,
  },
});
