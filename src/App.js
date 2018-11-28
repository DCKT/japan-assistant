// @flow

import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import { I18nProvider } from '@lingui/react'
import catalogFr from './locales/fr/messages.js'
import catalogEn from './locales/en/messages.js'
import firebase from './services/firebase'

import AuthenticatedRouter from './scenes/private/AuthenticatedRouter'
import AnonymousRouter from './scenes/public/AnonymousRouter'
import UserContext from './services/states/UserContext'

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
        <Router>
          <AnonymousRouter path='/*' />
          <AuthenticatedRouter path='/app/*' />
        </Router>
      </UserContext.Provider>
    </I18nProvider>
  )
}
