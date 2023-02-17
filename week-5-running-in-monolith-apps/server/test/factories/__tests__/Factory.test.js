import { User } from "../../../src/models/index"
import Factory from "../Factory"

describe("Factory", () => {
  it("#getJSON returns user", () => {
    const factory = new Factory(User)
    const json = factory.getJSON()

    expect(json instanceof User).toBeFalsy()
    expect(Object.keys(json).length).toBeGreaterThan(0)
  })

  it("#build returns json", async () => {
    const factory = new Factory(User)
    const user = await factory.build({ firstName: "Julia" })

    expect(user instanceof User).toBeTruthy()
    expect(user.firstName).toBe("Julia")
    expect(Object.keys(user).length).toBeGreaterThan(0)
  })

  it("#create persists and returns object", async () => {
    const factory = new Factory(User)
    const user = await factory.create({ firstName: "Julia" })

    expect(user instanceof User).toBeTruthy()
    expect(user.id).toBeDefined()
    expect(user.firstName).toBe("Julia")
    expect(Object.keys(user).length).toBeGreaterThan(0)
  })

  it("#createMany persists and returns many objects", async () => {
    const factory = new Factory(User)
    const users = await factory.createMany(3, { firstName: "Julia" })

    expect(users.length).toBe(3)
    users.forEach((user) => {
      expect(user.id).toBeDefined()
      expect(user.firstName).toBe("Julia")
    })
  })
})
