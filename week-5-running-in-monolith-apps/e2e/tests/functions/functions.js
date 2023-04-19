// @ts-check

export const truncateDatabase = async ({ request }) => {
  return await request.delete("/api/v1/e2e/users")
  // (should instead be a request to a "test" endpoint instead of "api")

  // for scalability, need to consider options such as (increasing by potential student difficulty):
  // - adding more requests to this function
  // - creating separate truncation functions for each database table
  // - consulting pattern - abstracting completely to a POST endpoint like "test/truncations", passing the models to be truncated
}

export const factoryCreate = async ({ request, data }) => {
  return await request.post("/api/v1/e2e/users", { data })
}
