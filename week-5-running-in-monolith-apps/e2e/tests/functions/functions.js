// @ts-check

export const truncateDatabase = async ({ request }) => {
  return await request.delete("/api/v1/e2e/users")
}

export const factoryCreate = async ({ request, data }) => {
  return await request.post("/api/v1/e2e/users", { data })
}
