import React, { useState, useContext, useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import Home from './scenes/Home'
import Login from './scenes/Login'
import firebase from './services/firebase'

export const UserContext = React.createContext({ user: undefined, setUser: () => {} })

const AnonymousRoutes = props => {
  const userContext = useContext(UserContext)

  if (typeof userContext.user === 'undefined') {
    return <p>waiting</p>
  }

  if (userContext.user) {
    return <Redirect to="/app" noThrow />
  } else {
    return props.children
  }
}

const AuthenticatedRoutes = props => {
  const userContext = useContext(UserContext)

  if (typeof userContext.user === 'undefined') {
    return <div />
  }

  if (userContext.user) {
    return props.children
  } else {
    return <Redirect to="/login" noThrow />
  }
}

export default () => {
  const [user, setUser] = useState(undefined)

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(setUser)
    },
    [user]
  )

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <AnonymousRoutes path="/">
          <Login path="login" />
        </AnonymousRoutes>

        <AuthenticatedRoutes path="app">
          <Home path="/" />
        </AuthenticatedRoutes>
      </Router>
    </UserContext.Provider>
  )
}
