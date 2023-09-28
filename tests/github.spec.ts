import { test, expect } from '@playwright/test';
const REPO = 'test-repo';
const USER = 'sasquach44';

test('should create a bug report', async ({ request }) => {
  const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] report 1',
      body: 'Bug description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description'
  }));
});

test('should create a feature request', async ({ request }) => {
  const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] request 1',
      body: 'Feature description',
    }
  });

  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Feature] request 1',
    body: 'Feature description'
  }));
});

test('can create and delete repository', async ({ request }) => {
  // Create a new repository.
  const newRepo = await request.post(`https://api.github.com/user/repos`, {
    data: {
      name: 'test-repo-77',
      description: 'test repo',
    }
  });
  expect(newRepo.ok()).toBeTruthy();

  // Delete the repository.
  const deleteRepo = await request.delete(`https://api.github.com/repos/${USER}/test-repo-77`);
  expect(deleteRepo.ok()).toBeTruthy();
});

