import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  console.log("done with title");
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('release notes', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the docs link.
  await page.getByRole('link', { name: 'Docs' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // Click the release notes link.
  await page.getByRole('link', { name: 'Release notes' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Release notes' })).toBeVisible();
});

test('search google for cat photos', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('cat photos');
  await page.getByRole('button', { name: "Google Search" }).first().click();
  await page.getByRole('link', { name: 'Images', exact: true }).click();
  await expect(page).toHaveTitle(/cat photox/);
});
