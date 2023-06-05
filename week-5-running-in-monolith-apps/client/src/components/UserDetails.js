import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const UserDetail = (props) => {
  const [user, setUser] = useState({})

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${props.match.params.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const userData = await response.json()
      setUser(userData.user)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <h1>Info on this user</h1>
      <h2>First Name: {user.firstName}</h2>
      <h2>Last Name: {user.lastName ? user.lastName : "N/A"}</h2>
      <h3>Email: {user.email}</h3>
      <hr />
      <Link to="/">Back to All Users</Link>
    </>
  )
}

export default UserDetail
