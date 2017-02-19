import { toJS, reaction, observable, action, extendObservable } from 'mobx'
import { fromResource } from 'mobx-utils'
import firebase from '../api/firebase'
import facebookLogin from '../helpers/facebookLogin'
import googleLogin from '../helpers/googleLogin'
import { auth as FirebaseAuth } from 'firebase'
import storage from '../helpers/storage'

export default (state) => {

  const authStateObservable = fromResource(sink => {
    sink(firebase.auth().currentUser)
    firebase.auth().onAuthStateChanged(sink, err => console.log('Auth error: ', err))
  })

  async function doAuthenticated(action = () => {}, navigation = false) {
    reaction(() => state.user, user => {
      if(user) action()
    }, true)

    if(!state.user) {
      const loginProvider = await storage.getItem('auth-provider')

      if(loginProvider) {
        authenticate(loginProvider)
      } else if(!!navigation) {
        navigation.navigate('Login')
      }
    }
  }

  function authenticate(providerName) {
    setLoading(true)
    storage.setItem('auth-provider', providerName)

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
    console.log(err)
  }

  const setCurrentUser = action(() => {
    state._currentUser = authStateObservable.current
  })

  setCurrentUser()

  return {
    authenticate,
    doAuthenticated,
    logOut
  }
}
