import express from "express"

import { User } from "../../../models/index.js"

const usersRouter = express.Router()

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query()
    return res.status(200).json({ users: users })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

export default usersRouter