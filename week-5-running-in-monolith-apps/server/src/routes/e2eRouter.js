import express from "express"

import { User } from "../models/index.js"
import * as models from "../models/index.js"
import truncateModel from "../../test/utils/truncateModel.cjs"

const e2eRouter = express.Router()

// should be completely moved out of the `api` folder
// depending on pattern we choose (test endpoints specific to models, or abstracting like consulting)
// - move all model specific endpoints to a `test` folder
// - or, create a "testRouter" for all abstracted test endpoints

e2eRouter.post("/truncateModels", async (req, res) => {
  try {
    const modelsToTruncate = req.body.models
    for (const model of modelsToTruncate) {
      await truncateModel(models[model])
    }

    return res.status(200).json({ message: "All users deleted" })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

e2eRouter.post("/:modelName", async (req, res) => {
  try {
    const { modelName } = req.params
    const attributes = req.body
    // console.log("model:", modelName)
    console.log("attributes:", attributes)
    // const entityModel = models[__dirname.upperFirst(entity)]

    // const { email, firstName, lastName } = req.body
    // const user = await User.query().insertAndFetch({ email, firstName, lastName })
    const user = await User.query().insertAndFetch(attributes)

    return res.status(201).json({ user: user })
    // return res.status(201).json({ user: user })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default e2eRouter
