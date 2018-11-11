// @flow
import React, { useContext } from 'react'
import { Router, Redirect } from '@reach/router'
import UserContext from '../../services/states/UserContext'
import NotFound from './scenes/not-found'

const Login = React.lazy(() => import('./scenes/login'))
const Register = React.lazy(() => import('./scenes/register'))

export default () => {
  const userContext = useContext(UserContext)

  if (typeof userContext.user === 'undefined') {
    return <div />
  } else if (userContext.user) {
    return <Redirect to='/app' noThrow />
  }

  return (
    <Router>
      <Login path='/' />
      <Register path='/register' />
      <NotFound default />
    </Router>
  )
}
