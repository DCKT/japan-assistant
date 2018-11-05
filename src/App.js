import React, { useState, useContext, useEffect, Suspense } from 'react'
import { Router, Redirect } from '@reach/router'
import { I18nProvider } from '@lingui/react'

import catalogFr from './locales/fr/messages.js'
import catalogEn from './locales/en/messages.js'
import firebase from './services/firebase'

const Home = React.lazy(() => import('./scenes/Home'))
const Login = React.lazy(() => import('./scenes/Login'))
const Register = React.lazy(() => import('./scenes/Register'))

export const UserContext = React.createContext({ user: undefined, setUser: () => {} })

const AnonymousRoutes = props => {
  const userContext = useContext(UserContext)

  if (typeof userContext.user === 'undefined') {
    return <div />
  }

  console.log('user is not undefined')

  if (userContext.user) {
    return <Redirect to='/app' noThrow />
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
    return <Redirect to='/login' noThrow />
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
    <I18nProvider language={'fr'} catalogs={{ fr: catalogFr, en: catalogEn }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <AnonymousRoutes path='/'>
              <Login path='login' default />
              <Register path='register' />
            </AnonymousRoutes>

            <AuthenticatedRoutes path='app'>
              <Home path='/' />
            </AuthenticatedRoutes>
          </Router>
        </Suspense>
      </UserContext.Provider>
    </I18nProvider>
  )
}
