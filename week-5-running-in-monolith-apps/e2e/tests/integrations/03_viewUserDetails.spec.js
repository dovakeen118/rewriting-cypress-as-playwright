// @ts-check
import { expect, test } from "@playwright/test"

import { factoryCreate, truncateDatabase } from "../functions/functions"

test.beforeEach(async ({ page, request }) => {
  const truncateResponse = await truncateDatabase({ request })
  expect(truncateResponse.ok()).toBeTruthy()

  const userResponse = await factoryCreate({
    request,
    data: { email: "hpotter@email.com", firstName: "Harry", lastName: "Potter" },
  })
  expect(userResponse.ok()).toBeTruthy()

  const parsedResponse = await userResponse.json()
  await page.goto(`/users/${parsedResponse.user.id}`)
})

test.describe("User Details Page", async () => {
  test("can see each of the details regarding that user", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Info on this user" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "First Name: Harry" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Last Name: Potter" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Email: hpotter@email.com" })).toBeVisible()
  })

  test("the page has a link to the users list page", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Back to All Users" })).toBeVisible()
  })
})
