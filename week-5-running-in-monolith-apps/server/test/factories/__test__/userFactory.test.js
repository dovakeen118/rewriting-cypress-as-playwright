import userFactory from "../userFactory"

describe("userFactory", () => {
  // factory designed to build JSON, not persist to database
  it("builds user json with default attributes", () => {
    const user = userFactory.build()

    expect(user).toHaveProperty("email")
    expect(user).toHaveProperty("firstName")
    expect(user).not.toHaveProperty("lastName")
  })

  it("allows an email to be passed in", () => {
    const user = userFactory.build({ email: "bob@email.com" })
    
    expect(user.email).toBe("bob@email.com")
  })

  it("allows a firstName to be passed in", () => {
    const user = userFactory.build({ firstName: "Bob" })
    
    expect(user.firstName).toBe("Bob")
  })

  it("allows a lastName to be passed in", () => {
    const user = userFactory.build({ lastName: "Smith" })
    
    expect(user.lastName).toBe("Smith")
  })
})
