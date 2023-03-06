const Factory = require("rosie").Factory
const User = require("../../src/models/index.js")

const userFactory = Factory.define("user").sequence("id").attrs({
  firstName: "John",
  lastName: "Doe",
  email: "johnDoe@email.com",
  createdAt: new Date(),
  updatedAt: new Date(),
})
module.exports = userFactory
