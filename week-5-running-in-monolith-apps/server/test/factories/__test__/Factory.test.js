// import { User } from "../../../src/models/index"
// import Factory from "../Factory"
const Factory = require("../Factory.js")
const User = require("../../../src/models/index.js")
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
      const user = await Factory.build("user")
      expect(user).toBeInstanceOf(User)
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
