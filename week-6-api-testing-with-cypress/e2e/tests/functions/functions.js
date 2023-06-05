// @ts-check

export const truncateModels = async ({ request, data }) => {
  return await request.post("/e2e/truncateModels", { data })
}

export const createRecord = async ({ request, modelName, data }) => {
  return await request.post(`/e2e/${modelName}`, { data })
}
