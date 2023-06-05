// @ts-check
import { expect, test } from "@playwright/test"

test.describe("Road Races Index", () => {
  // ^^ test.describe does not take argument of `page`
  test.beforeEach(async ({ page }) => {
    await page.goto("/road-races")
  })

  test("has title", async ({ page }) => {
    // title of webpage tab
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Road Races/)

    await expect(page).toHaveTitle("Road Races")
  })

  test("has a header", async ({ page }) => {
    // test that the header appears here
    await expect(
      page.getByRole("heading", { name: "Our Favorite Road Races" })
    ).toBeVisible()
    // ^^ find text for a "heading" element

    await expect(page.getByText("Our Favorite Road Races")).toBeVisible()
    // ^^ find by text on page
  })

  test("lists all road races", async ({ page }) => {
    // test to make sure road races are listed in the format we expect
    await expect(page.getByRole("listitem")).toHaveCount(2)
    await expect(page.getByRole("listitem")).toHaveText([
      "Disney Princess Half Marathon - 13.1 Miles",
      "Moab Trail Marathon - 26.2 Miles"
    ])
    // order of array matters

    await expect(
      page.getByText("Disney Princess Half Marathon - 13.1 Miles")
    ).toBeVisible()
    await expect(
      page.getByText("Moab Trail Marathon - 26.2 Miles")
    ).toBeVisible()
  })

  test("has a link to go to the new road race form", async ({ page }) => {
    // test to make sure the link exists and brings us to the right place
    await expect(page.getByText("Add a new Road Race")).toBeVisible()

    await page.getByText("Add a new Road Race").click()
    // await page.getByRole("link", { name: "Add a new Road Race" }).click()
    await expect(page).toHaveURL("/road-races/new")
  })
})
