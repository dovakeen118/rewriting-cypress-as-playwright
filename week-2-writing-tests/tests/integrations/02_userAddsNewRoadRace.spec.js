// @ts-check
import fs from "fs"
import { expect, test } from "@playwright/test"

import newRoadRace from "../newRoadRace.js"
import starterRoadRaces from "../starterRoadRaces.js"

const roadRacesTestFilePath = "roadRacesTest.json"

test.describe("Road Races New", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/road-races/new")
  })

  test.use({
    ignoreHTTPSErrors: true
  })

  test("adds a road race to the list upon submitting the form", async ({
    page
  }) => {
    // test filling in the form and submitting here
    await page.getByLabel("Name:").fill(newRoadRace.name)
    await page.getByLabel("Distance in Miles:").fill(newRoadRace.miles)
    await page.getByLabel("Location:").fill(newRoadRace.location)

    // await page.getByRole("button", { name: "Save this Race!" }).click();
    await page.getByText("Save this Race!").click()

    await expect(page).toHaveURL("/road-races")
    await expect(page.getByRole("listitem")).toHaveCount(3)

    // option 1: find last element in list
    // docs: use with caution, opt for locator with strictness
    const newRace = page.getByRole("listitem").last()
    await expect(newRace).toHaveText(
      `${newRoadRace.name} - ${newRoadRace.miles} Miles`
    )

    // option 2
    // await expect(page.getByRole("listitem")).toHaveText([
    //   "Disney Princess Half Marathon - 13.1 Miles",
    //   "Moab Trail Marathon - 26.2 Miles",
    //   "Pikes Peak Marathon - 26.2 Miles"
    // ])

    // option 3
    await expect(
      page.getByText("Pikes Peak Marathon - 26.2 Miles")
    ).toBeVisible()

    // option 4
    await expect(
      page.getByText(`${newRoadRace.name} - ${newRoadRace.miles} Miles`)
    ).toBeVisible()
  })

  test.afterEach(() => {
    fs.writeFileSync(roadRacesTestFilePath, JSON.stringify(starterRoadRaces))
  })
})
