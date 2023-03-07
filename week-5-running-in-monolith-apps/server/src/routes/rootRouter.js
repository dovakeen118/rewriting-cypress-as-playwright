import express from "express"
import clientRouter from "./clientRouter.js"
import e2eUsersRouter from "./api/v1/e2e/usersRouter.js"
import usersRouter from "./api/v1/usersRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/e2e/users", e2eUsersRouter)
rootRouter.use("/api/v1/users", usersRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
