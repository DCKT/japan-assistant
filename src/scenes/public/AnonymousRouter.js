// @flow
import React, { useContext, Suspense } from 'react'
import { Router, Redirect } from '@reach/router'
import UserContext from '../../services/states/UserContext'
import NotFound from './scenes/not-found'

const Home = React.lazy(() => import('./scenes/home'))
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
    <Suspense fallback={<div>Loading...</div>} maxDuration={2000}>
      <Router>
        <Home path='/' />
        <Login path='/login' />
        <Register path='/register' />
        <NotFound default />
      </Router>
    </Suspense>
  )
}
