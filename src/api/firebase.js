import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC1X7OnEIRGbaM3-SAIwXdYC1wK9yiOUMo',
  authDomain: 'crowdnews-4b627.firebaseapp.com',
  databaseURL: 'https://crowdnews-4b627.firebaseio.com',
  storageBucket: 'crowdnews-4b627.appspot.com',
  messagingSenderId: '746713077322'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
