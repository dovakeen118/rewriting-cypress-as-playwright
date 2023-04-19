import express from "express"

import { User } from "../../../../models/index.js"
import userFactory from "../../../../../test/factories/userFactory.js"
import truncateModel from "../../../../../test/utils/truncateModel.cjs"

const usersRouter = express.Router()

// should be completely moved out of the `api` folder
// depending on pattern we choose (test endpoints specific to models, or abstracting like consulting)
// - move all model specific endpoints to a `test` folder
// - or, create a "testRouter" for all abstracted test endpoints
usersRouter.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body
    const userJson = userFactory.build({ email, firstName, lastName })

    const user = await User.query().insertAndFetch(userJson)

    return res.status(201).json({ user: user })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

usersRouter.delete("/", async (req, res) => {
  try {
    // await User.knex().raw(`TRUNCATE TABLE :tableName: RESTART IDENTITY CASCADE`, {
    //   tableName: "users",
    // })
    // grabbed this raw query from consulting
    // not sure of other ways to handle this
    // there is also a `truncateModel` util in the test folder,
    await truncateModel(User)
    return res.status(200).json({ message: "All users deleted" })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default usersRouter
