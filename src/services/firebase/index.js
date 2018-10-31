import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDixCCaFT3f6SfbBVCThhcYJ1pk7yNoZgU',
  authDomain: 'memori-ef27e.firebaseapp.com',
  databaseURL: 'https://memori-ef27e.firebaseio.com',
  projectId: 'memori-ef27e',
  storageBucket: 'memori-ef27e.appspot.com',
  messagingSenderId: '392826615015'
}
firebase.initializeApp(config)

export default firebase
