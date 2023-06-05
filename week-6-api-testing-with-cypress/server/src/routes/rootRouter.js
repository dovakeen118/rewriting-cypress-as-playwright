import express from "express"
import brandsRouter from "./api/v1/brandsRouter.js"
import e2eRouter from "./e2eRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/e2e", e2eRouter)
rootRouter.use("/api/v1/brands", brandsRouter)
rootRouter.use("/", clientRouter)

export default rootRouter
