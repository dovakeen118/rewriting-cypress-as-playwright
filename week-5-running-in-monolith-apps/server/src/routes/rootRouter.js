import express from "express"
import clientRouter from "./clientRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import e2eRouter from "./e2eRouter.js"

const rootRouter = new express.Router() 

rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/e2e", e2eRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
