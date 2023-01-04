// @ts-check
import { expect, test } from "@playwright/test";

test.use({
  ignoreHTTPSErrors: true,
});
test.describe("Road Races Index", () => {
  // ^^ test.describe does not take argument of page

  test.beforeEach(async ({ page }) => {
    await page.goto("/road-races");
  });

  test("has title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Road Races/);
  });

  test("has a header", async ({ page }) => {
    // test that the header appears here
    await expect(
      page.getByRole("heading", { name: "Our Favorite Road Races" })
    ).toBeVisible();
  });

  test("lists all road races", async ({ page }) => {
    // test to make sure road races are listed in the format we expect
    await expect(page.getByRole("listitem")).toHaveCount(2);
    await expect(page.getByRole("listitem")).toHaveText([
      "Disney Princess Half Marathon - 13.1 Miles",
      "Moab Trail Marathon - 26.2 Miles",
    ]);
    // order of array matters
  });

  test("has a link to go to the new road race form", async ({ page }) => {
    // test to make sure the link exists and brings us to the right place
    await page.getByRole("link", { name: "Add a new Road Race" }).click();
    await expect(page).toHaveURL("/road-races/new");
  });
});
