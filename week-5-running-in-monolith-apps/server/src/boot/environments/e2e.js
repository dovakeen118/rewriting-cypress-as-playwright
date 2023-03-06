import getNodeEnv from "../../config/getNodeEnv.js"

if (getNodeEnv() === "e2e") {
  // development specific middlewares here
  require("dotenv").config()
}
