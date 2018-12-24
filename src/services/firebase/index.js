// @flow

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import config from './config.js'

firebase.initializeApp(config)

type FirebaseValue = any

const googleProvider = new firebase.auth.GoogleAuthProvider()
const twitterProvider = new firebase.auth.TwitterAuthProvider()

export const onFirebaseValue = (path: string, callback: Function): void => {
  firebase
    .database()
    .ref(path)
    .on('value', snap => {
      callback(snap.val())
    })
}

export const removeFirebaseValue = (path: string): Promise<FirebaseValue> => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(path)
      .remove()
  })
}

export const addFirebaseValue = (path: string, value: any): Promise<FirebaseValue> => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(path)
      .set(value)
  })
}

export const updateFirebaseValue = (path: string, value: any): Promise<FirebaseValue> => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(path)
      .update(value)
  })
}

export const setFirebaseValue = (path: string, value: any): Promise<FirebaseValue> => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(path)
      .set(value)
  })
}

export const firebaseLogout = () => firebase.auth().signOut()

export const firebaseSignInWithPopup = (provider: Object) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const token = result.credential.accessToken
      const user = result.user

      return { token, user }
    })
    .catch(error => {
      console.log(error.message)
    })
}

export const firebaseGoogleSignIn = () => firebaseSignInWithPopup(googleProvider)
export const firebaseTwitterSignIn = () => firebaseSignInWithPopup(twitterProvider)

export default firebase
