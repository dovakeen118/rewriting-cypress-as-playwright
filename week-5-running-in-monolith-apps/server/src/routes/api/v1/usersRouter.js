import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { User } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const usersRouter = express.Router()

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query()
    return res.status(200).json({ users: users })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.query().findById(req.params.id)
    return res.status(200).json({ user: user })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

usersRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  try {
    const newUser = await User.query().insertAndFetch(formInput)
    return res.status(201).json({ user: newUser })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter
