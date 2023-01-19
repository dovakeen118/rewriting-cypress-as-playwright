// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Users Index", async () => {
  test.beforeEach(async ({ page }) => {
    // cy.task("db:truncate", "User")
    // cy.task("db:insert", { modelName: "User", json: { firstName: "Harry", lastName: "Potter" } })
    await page.goto("/");
  });

  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Our App's Users" })
    ).toBeVisible();
  });

  test("lists all users", async ({ page }) => {
    await expect(page.getByRole("listitem")).toHaveCount(1);
    await expect(page.getByRole("listitem"))
      .toHaveText(["Harry Potter"]);
  })
});
