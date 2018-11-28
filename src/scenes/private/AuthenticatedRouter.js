// @flow

import React, { useContext, useState, useEffect } from 'react'

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
import { firebaseLogout, onFirebaseValue } from '../../services/firebase'
const Home = React.lazy(() => import('./scenes/home'))
const ManageCategories = React.lazy(() => import('./scenes/manage-categories'))

export default () => {
  const userContext = useContext(UserContext)
  const [categories, setCategories] = useState(undefined)
  const [words, setWords] = useState(undefined)

  if (typeof userContext.user === 'undefined') {
    return <div />
  } else if (!userContext.user) {
    return <Redirect to='/login' noThrow />
  }

  useEffect(() => {
    onFirebaseValue(`users/${userContext.uid}/words`, setWords)
    onFirebaseValue(`users/${userContext.user.uid}/categories`, setCategories)
  }, [])

  const commonProps = {
    categories: categories ? Object.keys(categories).map(categoryKey => categories[categoryKey]) : [],
    viewer: userContext.viewer,
    words
  }

  return (
    <AuthenticatedNavigation onLogout={firebaseLogout}>
      <Router>
        <Home path='/' {...commonProps} />
        <ManageCategories path='/categories' {...commonProps} />
        <NotFound default />
      </Router>
    </AuthenticatedNavigation>
  )
}
