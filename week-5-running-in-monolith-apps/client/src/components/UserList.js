import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const App = (props) => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await fetch("/api/v1/users")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const userData = await response.json()
      setUsers(userData.users)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const userListItems = users.map((user) => {
    return (
      <li>
        {user.firstName} {user.lastName}
      </li>
    )
  })

  return (
    <>
      <h1>Our App's Users</h1>
      <Link to="/users/new">Add New User</Link>
      <ul className="users">{userListItems}</ul>
    </>
  )
}

export default App
