import getNodeEnv from "../../config/getNodeEnv.js"

if (getNodeEnv() === "development") {
  // development specific middlewares here
  require("dotenv").config()
}
