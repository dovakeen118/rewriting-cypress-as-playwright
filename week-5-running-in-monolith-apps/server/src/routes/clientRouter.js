import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

const clientRoutes = ["/", "/users/new", "/users/:id"]

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
