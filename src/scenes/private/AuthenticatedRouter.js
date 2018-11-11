// @flow

import React, { useContext } from 'react'
import { Router, Redirect } from '@reach/router'
import UserContext from '../../services/states/UserContext'
import NotFound from './scenes/not-found'
const Home = React.lazy(() => import('./scenes/home'))
const WordsCategory = React.lazy(() => import('./scenes/words-category'))

export default () => {
  const userContext = useContext(UserContext)

  if (typeof userContext.user === 'undefined') {
    return <div />
  } else if (!userContext.user) {
    return <Redirect to='/login' noThrow />
  }

  return (
    <Router>
      <Home path='/' viewer={userContext.user} />
      <WordsCategory path='/categories/:category' />
      <NotFound default />
    </Router>
  )
}
