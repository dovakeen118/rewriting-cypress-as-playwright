import express from "express"

import { Brand } from "../models/index.js"
import * as models from "../models/index.js"
import truncateModel from "../../test/utils/truncateModel.cjs"

const e2eRouter = express.Router()

e2eRouter.post("/truncateModels", async (req, res) => {
  try {
    const modelsToTruncate = req.body.models
    for (const model of modelsToTruncate) {
      await truncateModel(models[model])
    }
    // deleting records, but I thought truncation was supposed to reset identity?

    return res.status(200).json({ message: "All records deleted" })
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

    // ^^ should I continue with this consulting pattern and add lodash?
    // need to look into pattern we want to create multiple records (post array vs multiple requests)

    const brand = await Brand.query().insertAndFetch(attributes)

    return res.status(201).json({ brand: brand })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default e2eRouter
