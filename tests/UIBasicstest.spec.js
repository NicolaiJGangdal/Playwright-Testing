const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  // chrome - plugins/ cookies
  // This method is for when you have inbuilt cookies or preferances you want to be without
  // This is automation:
  const context = await browser.newContext(); //Opens browser and waits for this to be done before doing next step
  const page = await context.newPage(); //Opens a new page and waits for this to be done before doing next step
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //Navigates the new page to the given url and waits for this to be done before doing next step
  console.log(await page.title());
});

test.only("Page Playwright test", async ({ page }) => {
  //This version does the same as the one above, but without opening a cookie free browser
  await page.goto("https://google.com");
  //Get title - asertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
  console.log("Branch Test");
});
