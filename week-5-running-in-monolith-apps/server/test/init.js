import boot from "../src/boot.js"
import "./factories.js"

beforeAll(async () => {
  const bootResult = await boot()
  if (bootResult) {
    global.connection = bootResult.connection
  }
})

afterAll(async () => {
  await global.connection.destroy()
})
