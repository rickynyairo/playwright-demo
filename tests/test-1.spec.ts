import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('link', { name: 'English' }).click();
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('yellow aston martin');
  await page.getByRole('link', { name: 'Images', exact: true }).click();
  await expect(page).toHaveTitle(/yellow aston martin/);
});