import { Factory } from "rosie"

describe("userFactory", () => {
  describe("build", () => {
    it("builds a user", () => {
      const user = Factory.build("user", { firstName: "Bob" })
      expect(user).toHaveProperty("email")
      expect(user).toHaveProperty("firstName")
    })
  })
})
