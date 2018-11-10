import firebase from 'firebase'
import config from './data/config.js'

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

export default firebase
