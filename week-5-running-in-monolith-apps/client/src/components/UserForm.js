import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"

import translateServerErrors from "../services/translateServerErrors"

const UserForm = (props) => {
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newUser),
      })
      if (!response.ok && response.status === 422) {
        const body = await response.json()
        const newErrors = translateServerErrors(body.errors)
        return setErrors(newErrors)
      } else if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const responseBody = await response.json()
      if (responseBody.user) {
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  return (
    <>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Create User" />
      </form>
    </>
  )
}

export default UserForm
