// @ts-check
import { expect, test } from "@playwright/test"

// import truncateModel from "../../../server/test/utils/truncateModel.cjs"
// import { User } from "../../../server/src/models/index.js"

test.describe("Users Index", async () => {
  test.beforeAll(async ({ request }) => {
    // await truncateModel(User)
    // ^^ resulted in error, undefined for `raw`

    // const truncateResponse = await request.delete("/api/v1/e2e/users")
    // expect(truncateResponse.ok()).toBeTruthy()

    const response = await request.post("/api/v1/e2e/users", {
      data: {
        firstName: "Harry",
        lastName: "Potter",
      },
    })
    expect(response).toBeTruthy()
  })

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

  test.afterAll(async ({ request }) => {
    const response = await request.delete("/api/v1/e2e/users")
    expect(response.ok()).toBeTruthy()
  })
})
