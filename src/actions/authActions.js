import { toJS, reaction, observable, action, extendObservable } from 'mobx'
import { fromResource } from 'mobx-utils'
import firebase from '../api/firebase'
import facebookLogin from '../helpers/facebookLogin'
import googleLogin from '../helpers/googleLogin'
import { auth as FirebaseAuth } from 'firebase'

export default (state) => {

  const authStateObservable = fromResource(sink => {
    sink(firebase.auth().currentUser)
    firebase.auth().onAuthStateChanged(sink, err => console.log('Auth error: ', err))
  })

  function authenticate(providerName) {
    setLoading(true)

    return Promise.resolve(providerName)
      .then(p => {
        if(p === 'google') return getGoogleCredential()
        if(p === 'facebook') return getFacebookCredential()
      })
      .then(credential => firebase.auth().signInWithCredential(credential))
      .then(() => setLoading(false))
      .catch(handleAuthError)
  }

  function logOut() {
    return firebase.auth()
      .signOut()
      .catch(handleAuthError)
  }

  const setLoading = action((setValue = true) => {
    state.authLoading = setValue
  })

  async function getGoogleCredential() {
    const google = googleLogin()
    const token = await google.login()

    return FirebaseAuth.GoogleAuthProvider.credential(null, token)
  }

  async function getFacebookCredential() {
    const facebook = facebookLogin()
    const token = await facebook.login()

    return FirebaseAuth.FacebookAuthProvider.credential(token)
  }

  function handleAuthError(err) {
    console.warn(err)
  }

  const setCurrentUser = action(() => {
    state._currentUser = authStateObservable.current
  })

  setCurrentUser()

  return {
    authenticate,
    logOut
  }
}
