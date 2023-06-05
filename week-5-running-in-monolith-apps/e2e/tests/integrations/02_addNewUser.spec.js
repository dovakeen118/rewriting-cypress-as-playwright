// @ts-check
import { expect, test } from "@playwright/test"

import { truncateModels } from "../functions/functions"

test.beforeEach(async ({ request }) => {
  await truncateModels({ request, data: { models: ["User"] } })
})

test.describe("Add New User Form", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/users/new")
  })

  test.describe("when the form is filled out correctly", async () => {
    test("creates new user listed on the user index page", async ({ page }) => {
      await page.getByLabel("Email:").fill("pdickett@email.com")
      await page.getByLabel("First Name:").fill("Dan")
      await page.getByLabel("Last Name:").fill("Pickett")
      await page.getByRole("button", { name: "Create User" }).click()

      await expect(page.getByRole("listitem")).toHaveText(["Dan Pickett"])
    })

    test("redirects to the user index page", async ({ page }) => {
      // better/ different way to handle this and above test without repeat filling out form?
      await page.getByLabel("Email:").fill("pdickett@email.com")
      await page.getByLabel("First Name:").fill("Dan")
      await page.getByLabel("Last Name:").fill("Pickett")
      await page.getByRole("button", { name: "Create User" }).click()

      await expect(page).toHaveURL("/")
    })
  })

  test.describe("when the form is filled out incorrectly", async () => {
    test("remains on the new user form page if submitted without an email and first name", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Create User" }).click()

      await expect(page).toHaveURL("/users/new")
    })

    test("displays error messages about missing fields", async ({ page }) => {
      await page.getByRole("button", { name: "Create User" }).click()

      await expect(page.getByRole("listitem")).toHaveCount(2)
      await expect(page.getByRole("listitem")).toHaveText([
        "Email: is a required property",
        "First Name: is a required property",
      ])
    })
  })
})
