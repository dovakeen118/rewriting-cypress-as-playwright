// @ts-check
import fs from 'fs'
import { test, expect } from "@playwright/test";

import newRoadRace from "../newRoadRace.js"
import starterRoadRaces from "../starterRoadRaces.js"
// ^^ originally had as JSON
// TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".json"

const roadRacesFilePath = "roadRaces.json"

test.describe("Road Races New", () => {
  test.beforeEach(async ({ page }) => {
    fs.writeFileSync(roadRacesFilePath, JSON.stringify(starterRoadRaces))
    await page.goto("/road-races/new");
  })

  test.afterEach(async ({ page }) => {
    fs.writeFileSync(roadRacesFilePath, JSON.stringify(starterRoadRaces))
  })

  test("adds a road race to the list upon submitting the form", async ({ page }) => {
    // test filling in the form and submitting here
    await page.getByLabel("Name:").fill(newRoadRace.name);
    await page.getByLabel("Distance in Miles:").fill(newRoadRace.miles);
    await page.getByLabel("Location:").fill(newRoadRace.location);
    await page.getByRole("button", { name: "Save this Race!" }).click();

    await expect(page).toHaveURL("/road-races")
    await expect(page.getByRole("listitem")).toHaveCount(3);
    
    // option 1: find last element in list
    // docs: use with caution, opt for locator with strictness
    const newRace = page.getByRole("listitem").last()
    await expect(newRace).toHaveText(`${newRoadRace.name} - ${newRoadRace.miles} Miles`)
    
    // option 2
    await expect(page
      .getByRole("listitem"))
      .toHaveText(["Disney Princess Half Marathon - 13.1 Miles", "Moab Trail Marathon - 26.2 Miles", "Pikes Peak Marathon - 26.2 Miles"]);
  })
})