import { User } from "../../../src/models"
import Factory from "../Factory"

describe("userFactory", () => {
  const userFactory = new Factory(User)

  it("creates user json with default attributes", async () => {
    const persistedUser = await userFactory.create()

    expect(persistedUser).toBeDefined()
    expect(persistedUser.email).toBeDefined()
  })

  it("allows a firstName to be passed in", async () => {
    const firstName = "Jane"
    const persistedUser = await userFactory.create({ firstName })

    expect(persistedUser).toBeDefined()
    expect(persistedUser.firstName).toBe(firstName)
  })

  it("allows a commitment to be passed in", async () => {
    const lastName = "Doe"
    const persistedUser = await userFactory.create({ lastName })

    expect(persistedUser).toBeDefined()
    expect(persistedUser.lastName).toBe(lastName)
  })
})
