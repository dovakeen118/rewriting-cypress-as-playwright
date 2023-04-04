const Model = require("./Model")

class User extends Model {
  static get tableName() {
    return "users"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "firstName"],
      properties: {
        email: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
      },
    }
  }
}

module.exports = User
