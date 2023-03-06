// import { User } from "../../../src/models/index"
// import Factory from "../Factory"
const Factory = require("rosie").Factory
// const User = require("../../../src/models/index.js")
const userFactory = require("../userFactory.js")
beforeEach(() => {
  Factory.resetAll()
})
describe("Factory", () => {
  test("dummy test", () => {
    expect(1).toBe(1)
  })
  // describe("getJSON", () => {
  //   it("returns a JSON object", async () => {
  //     const user = await Factory.getJSON("user")
  //     expect(user).toBeInstanceOf(Object)
  //   })
  // })

  describe("build", () => {
    it("builds a user", async () => {
      const user = userFactory.build("user")
      expect(user).toHaveProperty("id")
      expect(user).toHaveProperty("firstName")
      expect(user).toHaveProperty("lastName")
      expect(user).toHaveProperty("email")
    })
  })
  // describe("create", () => {
  //   it("creates a user", async () => {
  //     const user = await Factory.create("user")
  //     expect(user).toBeInstanceOf(User)
  //   })
  // })
  // describe("createMany", () => {
  //   it("creates many users", async () => {
  //     const users = await Factory.createMany("user", 5)
  //     expect(users).toBeInstanceOf(Array)
  //     expect(users.length).toBe(5)
  //   })
  // })
})
