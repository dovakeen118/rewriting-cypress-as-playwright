import express from "express"

import { User } from "../../../../models/index.js"
import userFactory from "../../../../../test/factories/userFactory.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res) => {
  //
  console.log("users e2e router POST")
  const prevCount = await User.query().count()
  console.log("prev # users", prevCount)
  //

  try {
    const { firstName, lastName } = req.body
    const userJson = userFactory.build({ firstName, lastName })

    console.log("user json", userJson)

    const user = await User.query().insertAndFetch(userJson)

    //
    const postCount = await User.query().count()
    console.log("post # users", postCount)
    console.log("user", user)
    //

    return res.status(201).json({ user: user })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

usersRouter.delete("/", async (req, res) => {
  //
  console.log("users e2e router DELETE / TRUNCATE")
  const prevCount = await User.query().count()
  console.log("prev # users", prevCount)
  //

  try {
    await User.knex().raw(`TRUNCATE TABLE :tableName: CASCADE`, { tableName: "users" })
    // seems to be deleting but not resetting the identity
    // have not looked into what this method is doing yet, referenced from test/util/truncateModel

    //
    const postCount = await User.query().count()
    console.log("post # users", postCount)
    //

    return res.status(200).json({ message: "All users deleted" })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default usersRouter
