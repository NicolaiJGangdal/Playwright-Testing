const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  // chrome - plugins/ cookies
  // This method is for when you have inbuilt cookies or preferances you want to be without
  // This is automation:
  const context = await browser.newContext(); //Opens browser and waits for this to be done before doing next step
  const page = await context.newPage(); //Opens a new page and waits for this to be done before doing next step
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //Navigates the new page to the given url and waits for this to be done before doing next step
  // console.log(await page.title());
  //css, xpath
  await userName.type("rahulshetty"); //Here we are locating the correct input box for username, then we enter the "type" text into it
  await page.locator("[type='password']").type("learning"); // Same as above but with password
  await signIn.click(); // Same as above but with clicking a button instead of typing, after locating the correct item
  // Wait until this locator shows up on the page
  console.log(await page.locator("[style*='block']").textContent()); // This waits for content in "error message" then prints it out with console.log
  await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //Checks if the error message contains a certain word
  //Now we need to make the test correct the username
  await userName.fill("");
  await userName.fill("rahulshettyacademy"); //Fill clears the existing content and writes in new userName
  await signIn.click(); //attempting to log in again
  console.log(await cardTitles.first().textContent()); //Searching for a card-element on the page after successfully logging in, searching for the first element in the array - then prints it
  // console.log(await cardTitles.nth(1).textContent()); // same as above, but retrieves the second element in the array
  const allTitles = await cardTitles.allTextContents(); // Above we grabbed the first and second item in a list. Now we are grabbing all
  console.log(allTitles);
});

test("Page Playwright test", async ({ page }) => {
  //This version does the same as the one above, but without opening a cookie free browser
  await page.goto("https://google.com");
  //Get title - asertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
  console.log("Branch Test");
});

test.only("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control "); // Create a variabel containing the html for the dropdown menu
  await dropdown.selectOption("consult"); // waiting for page to load, then choosing the option with the value "consult" inside the dropdown menu

  //Selecting the User Radiobox and checking with assertion if the correct value is selected
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  //Checking a checkbox - then unchecking it - then testing if the box is unchecked with an assertion
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //    await page.pause(); //Freezes the screen and waits for you to click -next step - handy when a test goes to fast
});
