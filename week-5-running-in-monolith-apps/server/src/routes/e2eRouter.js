import express from "express"
import { validationResult } from "express-validator"
import _ from "lodash"

import "../../test/factories.js"
import * as models from "../models/index.js"
import Factory from "../../test/factories/Factory.js"
import truncateModel from "../../test/utils/truncateModel.cjs"

const e2eRouter = express.Router()

e2eRouter.post("/truncations", async (req, res) => {
  try {
    let modelsToTruncate = req.body.models

    if (!Array.isArray(modelsToTruncate)) {
      modelsToTruncate = [modelsToTruncate]
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const model of modelsToTruncate) {
      // eslint-disable-next-line no-await-in-loop
      await truncateModel(models[model])
    }

    return res.status(201).json({ message: "tables have been reset" })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

e2eRouter.post("/factories", async (req, res) => {
  try {
    validationResult(req).throw()
    // console.log("params", req.params);
    // console.log("body", req.body);
    // const { entity } = req.params
    const entity = req.body.data.name
    const attributes = req.body.data.attributes
    // const attributes = req.body
    const entityModel = models[_.upperFirst(entity)]
    const entityModelFactory = new Factory(entityModel)
    const result = await entityModelFactory.create(attributes)
    const json = result.toJSON()
    return res.status(200).json(json)
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({ errors: error })
  }
})

export default e2eRouter