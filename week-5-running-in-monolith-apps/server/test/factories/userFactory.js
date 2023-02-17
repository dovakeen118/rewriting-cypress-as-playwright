import { Factory } from "rosie"

import { User } from "../../src/models/index.js"

Factory.define("User", User)
  .sequence("email", (i) => `user${i}@example.com`)

export default Factory