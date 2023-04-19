import { Factory } from "rosie"

// import { User } from "../../src/models/index.js"

const userFactory = Factory.define("user").sequence("email", (i) => `user${i}@email.com`)
// const userFactory = Factory.define("User", User).sequence("email", (i) => `user${i}@email.com`)
// the rosie factories are working, but this was where I left off with Rosie for a better implementation
// consulting uses a pattern that allows the actual model to be passed to the Factory for validations

export default userFactory
