import { Factory } from "rosie"

// import { User } from "../../src/models/index.js"

const userFactory = Factory.define("user").sequence("email", (i) => `user${i}@email.com`)
// const userFactory = Factory.define("User", User).sequence("email", (i) => `user${i}@email.com`)

export default userFactory
