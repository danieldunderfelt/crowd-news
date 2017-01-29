import { toJS, reaction, observable, action, extendObservable } from 'mobx'
import { fromResource } from 'mobx-utils'
import firebase from '../api/firebase'
import storage from '../helpers/storage'

export default (state) => {

  const authStateObservable = fromResource(sink => {
    sink(firebase.auth().currentUser)
    firebase.auth().onAuthStateChanged(sink, err => console.log('Auth error: ', err))
  })

  function authenticate() {

    return firebase.auth()
      .signInAnonymously()
      .catch(err => {
        console.warn(err)
      })
  }

  function ensureAuth() {
    if(!authStateObservable.current()) {
      authenticate()
    }
  }

  return {
    authenticate,
    currentUser: authStateObservable.current
  }
}
