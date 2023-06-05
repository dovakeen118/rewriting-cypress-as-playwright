// @ts-check
import { expect, test } from "@playwright/test"

import { createRecord, truncateModels } from "../../functions/functions"

test.beforeEach(async ({ request}) => {
  await truncateModels({ request, data: { models: ["Brand"] } })
  await createRecord({
    request,
    modelName: "Brand",
    data: { name: "WGAC" }
  })
  await createRecord({
    request,
    modelName: "Brand",
    data: { name: "Grove Co." }
  })
})

test.describe("api/v1/brandsRouter", async () => {
  test("GET /brands", async ({ request }) => {
    const response = await request.get("/api/v1/brands")
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/json');
    
    const responseBody = await response.json();
    expect(responseBody.brands.length).toBe(2)
    expect(responseBody.brands[0].name = "WGAC")
    expect(responseBody.brands[1].name = "Grove Co.")
  })

  test("GET /brands/:id", async ({ request }) => {
    const brand = await createRecord({
      request,
      modelName: "Brand",
      data: { name: "Earth Hero" }
    })
    const responseBody = await brand.json()
    const brandResponse = await request.get(`/api/v1/brands/${responseBody.brand.id}`)
    
    expect(brandResponse.ok()).toBeTruthy()
    expect(brandResponse.status()).toBe(200)
    expect(brandResponse.headers()['content-type']).toContain('application/json');
    expect(responseBody.brand.name).toBe("Earth Hero")
  })

  test.describe("POST /brands", async () => {
    test("when posting successfully", async ({ request }) => {
      const brandResponse = await request.post("/api/v1/brands", { data: { name: "Fillaree" } })
      expect(brandResponse.ok()).toBeTruthy()
      expect(brandResponse.status()).toBe(201)
      expect(brandResponse.headers()['content-type']).toContain('application/json');
      
      const responseBody = await brandResponse.json()
      expect(responseBody.brand.name).toBe("Fillaree")
    })
    
    test("when posting unsuccessfully", async ({ request }) => {
      const failedResponse = await request.post("/api/v1/brands", { data: { name: "" } })
      expect(failedResponse.ok()).toBeFalsy()
      expect(failedResponse.status()).toBe(422)

      const responseBody = await failedResponse.json()
      expect(responseBody.errors.name[0].keyword).toBe("required")
      expect(responseBody.errors.name[0].message).toBe("is a required property")
      expect(responseBody.errors.name[0].params.missingProperty).toBe("name")
    })
  })
})
