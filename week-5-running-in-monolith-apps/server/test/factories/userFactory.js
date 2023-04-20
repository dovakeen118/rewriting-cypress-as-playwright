import { Factory } from "rosie"

import { User } from "../../src/models/index.js"

const userFactory = Factory.define("User", User)
  .sequence("email", (i) => `user${i}@email.com`)
  .sequence("firstName", (i) => `User ${i}`)
// passing in the model creates a User object instead of plain JSON
// since it just builds the object and does not persist, we don't see any model jsonSchema validations
export default userFactory
