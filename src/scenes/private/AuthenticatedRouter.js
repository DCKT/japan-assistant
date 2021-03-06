// @flow

import React, { useContext, useState, useEffect, Suspense } from 'react'

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
const ManageLists = React.lazy(() => import('./scenes/manage-lists'))
const Support = React.lazy(() => import('./scenes/support'))
const Training = React.lazy(() => import('./scenes/training'))
const OralTraining = React.lazy(() => import('./scenes/oral-training'))
const Notes = React.lazy(() => import('./scenes/notes'))

export default () => {
  const userContext = useContext(UserContext)
  const [lists, setLists] = useState(undefined)
  const [words, setWords] = useState(undefined)

  useEffect(
    () => {
      if (userContext.user) {
        onFirebaseValue(`users/${userContext.user.uid}/words`, setWords)
        onFirebaseValue(`users/${userContext.user.uid}/lists`, setLists)
      }
    },
    [userContext]
  )

  if (typeof userContext.user === 'undefined') {
    return <div />
  } else if (!userContext.user) {
    return <Redirect to='/login' noThrow />
  }

  const commonProps = {
    lists,
    words,
    viewer: userContext.user
  }

  return (
    <AuthenticatedNavigation onLogout={firebaseLogout}>
      <Suspense fallback={<div>Loading...</div>} maxDuration={2000}>
        <Router>
          <Home path='/' {...commonProps} />
          <ManageLists path='/lists' {...commonProps} />
          <Support path='/support' {...commonProps} />
          <Training path='/training' {...commonProps} />
          <OralTraining path='/oral-training' {...commonProps} />
          <Notes path='/notes/*' {...commonProps} />
          <NotFound default />
        </Router>
      </Suspense>
    </AuthenticatedNavigation>
  )
}
