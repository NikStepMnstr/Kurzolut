import { expect, test } from '@playwright/test';

test.describe('Currency converter', () => {
  test('shows the real rates', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Kurzolut' })).toBeVisible();
    await expect(page.getByText(/Rates for/)).toBeVisible();
    await expect(page.getByRole('button', { name: /^EUR/ })).toBeVisible();
  });

  test('converts an amount', async ({ page }) => {
    await page.goto('/');

    const note = await page.getByText(/^1 EUR = /).innerText();
    const rate = note.split(' ')[3];
    await page.getByLabel('Amount in CZK').fill(rate);

    await expect(page.getByLabel('Result in EUR')).toHaveText('1.00 EUR');
  });

  test('converts with a rate quoted per 100 units', async ({ page }) => {
    await page.goto('/');

    const hufTile = page.getByRole('button', { name: /^HUF/ });
    await expect(hufTile).toContainText('per 100');
    await hufTile.click();

    const note = await page.getByText(/^100 HUF = /).innerText();
    const rate = note.split(' ')[3];
    await page.getByLabel('Amount in CZK').fill(rate);

    await expect(page.getByLabel('Result in HUF')).toHaveText('100.00 HUF');
  });

  test('filters the rates', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Search currencies').fill('hungary');

    await expect(page.getByRole('listitem')).toHaveCount(1);
    await expect(page.getByRole('button', { name: /^HUF/ })).toBeVisible();
  });

  test('says so when the search matches nothing', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Search currencies').fill('zzz');

    await expect(page.getByText('No currency matches "zzz".')).toBeVisible();
  });

  test('remembers the selected currency after a reload', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /^USD/ }).click();
    await expect(page.getByLabel('Result in USD')).toBeVisible();

    await page.reload();

    await expect(page.getByLabel('Result in USD')).toBeVisible();
  });

  test('shows the rates after retrying a failed load', async ({ page }) => {
    // The app tries 3 times before showing the error.
    await page.route('**/api/cnb', (route) => route.abort(), { times: 3 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Try again' }).click();

    await expect(page.getByRole('button', { name: /^EUR/ })).toBeVisible();
  });
});
