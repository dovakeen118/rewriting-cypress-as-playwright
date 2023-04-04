import express from "express"

import { User } from "../../../../models/index.js"
import userFactory from "../../../../../test/factories/userFactory.js"

const usersRouter = express.Router()

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
    await User.knex().raw(`TRUNCATE TABLE :tableName: RESTART IDENTITY CASCADE`, {
      tableName: "users",
    })

    return res.status(200).json({ message: "All users deleted" })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default usersRouter
