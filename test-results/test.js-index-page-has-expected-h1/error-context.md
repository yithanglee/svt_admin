# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test.js >> index page has expected h1
- Location: tests/test.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Welcome to SvelteKit' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Welcome to SvelteKit' })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "Logo Svelte Admin" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Logo" [ref=e6]
        - generic [ref=e7]: Svelte Admin
      - button "Dark mode" [ref=e9] [cursor=pointer]:
        - img [ref=e11]
      - list [ref=e14]:
        - listitem
        - listitem
  - main [ref=e15]:
    - generic [ref=e18]:
      - heading "Sign in to our platform" [level=3] [ref=e19]
      - generic [ref=e20]:
        - text: Username
        - textbox "Username" [ref=e21]:
          - /placeholder: administrator
      - generic [ref=e22]:
        - text: Your password
        - textbox "Your password" [ref=e23]:
          - /placeholder: •••••
      - button "Login to your account" [ref=e24] [cursor=pointer]
```

# Test source

```ts
  1 | import { expect, test } from '@playwright/test';
  2 | 
  3 | test('index page has expected h1', async ({ page }) => {
  4 | 	await page.goto('/');
> 5 | 	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
    |                                                                            ^ Error: expect(locator).toBeVisible() failed
  6 | });
  7 | 
```