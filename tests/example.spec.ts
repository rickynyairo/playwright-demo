import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from './PlaywrightDevPage';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('release notes', async ({ page }) => {
  const playwrightDevPage = new PlaywrightDevPage(page);
  await playwrightDevPage.goto();

  // Click the docs link.
  await playwrightDevPage.docs.click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // Click the release notes link.
  await page.getByRole('link', { name: 'Release notes' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Release notes' })).toBeVisible();
});


test('search google for blue ferrari photos', async ({ page }) => {
  // open google
  await page.goto('https://www.google.com/');

  // change language to english
  const languageButton = page.getByRole('link', { name: 'English', exact: true });
  await languageButton.click();

  // search for blue ferrari photos
  await page.getByLabel('Search', { exact: true }).fill('blue ferrari photos');
  const searchButton = page.getByRole('button', { name: "Google Search" }).first();
  await searchButton.click();

  // click images
  const imagesButton = page.getByRole('link', { name: 'Images', exact: true });
  await imagesButton.click();

  // verify title
  await expect(page).toHaveTitle(/blue ferrari photos/);
});

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's Installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web first assertions, page fixtures and locators`,
    `Run single test, multiple tests, headed mode`,
    `Generate tests with Codegen`,
    `See a trace of your tests`
  ]);
});

test('should show Page Object Model article', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});
