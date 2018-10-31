// @flow

import React, { useContext } from 'react'
import { navigate } from '@reach/router'
import { UserContext } from '../App'

import firebase from '../services/firebase'

export default () => {
  const userContext = useContext(UserContext)

  const logMe = () => {
    userContext.setUser('toto')
    firebase
      .auth()
      .signInWithEmailAndPassword('test@test.fr', 'testtest')
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...
      })
    navigate('/app')
  }

  return (
    <>
      <h1> Yay</h1>
      <button onClick={logMe}>log me</button>
    </>
  )
}
