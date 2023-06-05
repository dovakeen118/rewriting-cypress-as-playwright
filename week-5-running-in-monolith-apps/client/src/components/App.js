import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import UserList from "./UserList"
import UserForm from "./UserForm"
import UserDetails from "./UserDetails"

import "../assets/scss/main.scss"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route exact path="/users/new" component={UserForm} />
        <Route exact path="/users/:id" component={UserDetails} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
