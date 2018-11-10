import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import config from './config.js'

firebase.initializeApp(config)

type FirebaseValue = $FlowFixMe

export const onFirebaseValue = (path: string, callback): void => {
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

export default firebase
