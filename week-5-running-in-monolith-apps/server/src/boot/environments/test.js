import getNodeEnv from "../../config/getNodeEnv.js"

if (getNodeEnv() === "test") {
  // development specific middlewares here
  require("dotenv").config()
}
