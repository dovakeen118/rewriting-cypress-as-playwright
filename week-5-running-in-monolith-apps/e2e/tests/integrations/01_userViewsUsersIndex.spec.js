// @ts-check
import { expect, test } from "@playwright/test"

import { factoryCreate, truncateDatabase } from "../functions/functions"

test.beforeEach(async ({ request }) => {
  // const truncateResponse = await request.delete("/api/v1/e2e/users")
  const truncateResponse = await truncateDatabase({ request })
  expect(truncateResponse.ok()).toBeTruthy()

  const userResponse = await factoryCreate({
    request,
    data: { email: "hpotter@email.com", firstName: "Harry", lastName: "Potter" },
  })
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
  })

  test("lists all users", async ({ page }) => {
    await expect(page.getByRole("listitem")).toHaveCount(1)
    await expect(page.getByRole("listitem")).toHaveText(["Harry Potter"])
  })

  test("the page has a link to add a new user", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Add New User" })).toBeVisible()
  })
})
