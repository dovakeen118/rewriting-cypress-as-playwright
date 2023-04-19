// @ts-check
import { expect, test } from "@playwright/test"

import { factoryCreate, truncateDatabase } from "../functions/functions"

// Note to remember:
// important that this `test.beforeEach` block is not nested within the `test.describe`
// they both use and add to the same `test` context
test.beforeEach(async ({ request }) => {
  // Truncation Option 1:
  // const truncateResponse = await request.delete("/api/v1/e2e/users")
  // (instead of an `api` endpoint, should be `test` or `testData`)

  // using the `request` directly in the test file to specify which data to truncate
  // make it clear to students what we're doing
  // consulting uses more abstracted patterns that makes a POST request to a "test/truncations" endpoint, the body contains the models to be truncated

  // Truncation Option 2:
  const truncateResponse = await truncateDatabase({ request })

  // implementing via a function
  // consulting's use of helper functions utilizes axios for the requests to interact with the database
  // to limit introducing another technology, the functions are defined to be passed the `request` object made available by Playwright

  // the truncation endpoint is "hardcoded" to truncate the Users table, refactor would be required for scalability
  // potentially adding more requests in the function file
  // or like the consulting pattern, could be built out further to take argument of which models to truncate, in an array as the string model names
  // await truncateDatabase({ request, ["User"] })
  // (helper function would then make a post request instead of delete)

  expect(truncateResponse.ok()).toBeTruthy()

  // Test Data Creation Option 1:
  const userResponse = await factoryCreate({
    request,
    data: { email: "hpotter@email.com", firstName: "Harry", lastName: "Potter" },
  })
  // similar considerations as the above truncation
  // having students handle the actions directly in the test file,
  // or abstracting some of it to service helper functions

  // Test Data Creation Option 2:
  // const response = await request.post("/api/v1/e2e/users", {
  //   data: {
  //    email: "hpotter@email.com",
  //    firstName: "Harry",
  //     lastName: "Potter",
  //   },
  // })
  expect(userResponse.ok()).toBeTruthy()
})

test.describe("Users Index", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("has a heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Our App's Users" })).toBeVisible()
    // (personal opinion, I don't like this style of finding elements by "heading")
  })

  test("lists all users", async ({ page }) => {
    await expect(page.getByRole("listitem")).toHaveCount(1)
    await expect(page.getByRole("listitem")).toHaveText(["Harry Potter"])
  })

  test("the page has a link to add a new user", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Add New User" })).toBeVisible()
  })
})
