// @flow

import React, { useContext } from 'react'

/**
 * Components
 */
import { Router, Redirect } from '@reach/router'
import UserContext from '../../services/states/UserContext'
import NotFound from './scenes/not-found'
import AuthenticatedNavigation from './components/AuthenticatedNavigation'

/**
 * Utils
 */
import { firebaseLogout } from '../../services/firebase'
const Home = React.lazy(() => import('./scenes/home'))
const WordsCategory = React.lazy(() => import('./scenes/words-category'))
const ManageCategories = React.lazy(() => import('./scenes/manage-categories'))

export default () => {
  const userContext = useContext(UserContext)

  if (typeof userContext.user === 'undefined') {
    return <div />
  } else if (!userContext.user) {
    return <Redirect to='/login' noThrow />
  }

  return (
    <AuthenticatedNavigation onLogout={firebaseLogout}>
      <Router>
        <Home path='/' viewer={userContext.user} />
        <WordsCategory path='/categories/:category' />
        <ManageCategories path='/categories' />
        <NotFound default />
      </Router>
    </AuthenticatedNavigation>
  )
}
