const { test, expect } = require("@playwright/test");



// Create new test to access this site "https://rahulshettyacademy.com/client/"
// Log In - Access First Item On Page
// Username: nfotball_96@hotmail.com PW: Playwright123

test("Solo Browser Context Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const cardTitles = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").type("nfotball_96@hotmail.com");
  await page.locator("[type='password']").type("Playwright123");
  await page.locator("#login").click();

  //  console.log(await page.locator("[style*='block']").textContent());
  //  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  //  console.log(await cardTitles.first().textContent());
  
  //  await page.waitForLoadState('networkidle');

  await cardTitles.first().waitFor();
  const titles = await cardTitles.allTextContents();
  console.log(titles);
});