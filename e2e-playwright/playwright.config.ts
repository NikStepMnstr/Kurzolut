import { defineConfig, devices } from '@playwright/test';

const deployedUrl = process.env.E2E_BASE_URL;
const previewUrl = 'http://localhost:4173';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: deployedUrl ?? previewUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: deployedUrl
    ? undefined
    : {
        command: 'npm run build && npm run preview -- --port 4173 --strictPort',
        url: previewUrl,
        reuseExistingServer: !process.env.CI,
      },
});
