import { toJS, reaction, observable, action, extendObservable } from 'mobx'
import { fromResource } from 'mobx-utils'
import firebase from '../api/firebase'
import storage from '../helpers/storage'

export const firebaseUser = (data = {
  uid: false,
  refreshToken: '',
  isAnonymous: true,
  Dd: '',
  name: null
}) => {
  return observable({
    id: data.uid,
    refreshToken: data.refreshToken,
    isAnonymous: data.isAnonymous,
    token: data.Dd,
    name: data.displayName
  })
}

export default (state) => {

  const authStateObservable = fromResource(sink => {
    firebase.auth().onAuthStateChanged(sink, err => console.log('Auth error: ', err))
  })

  async function persistUser(user) {
    storage.setItem('user', toJS(user, false))
  }

  function applyUser(user) {
    extendObservable(state.user, user)
  }

  function authenticate() {
    if(state.user.id !== false) return false

    return firebase.auth()
      .signInAnonymously()
      .catch(err => {
        console.warning(err)
      })
  }

  const setUserData = action('Set user', user => {
    extendObservable(state, { user: firebaseUser(user) })
    persistUser(state.user)
  })

  reaction(authStateObservable.current, user => {
    if(user) {
      setUserData(user)
    }
  })

  // Hydrate user from storage

  storage
    .getItem('user')
    .then(applyUser)
    .then(authenticate)

  return {
    authenticate,
    persistUser,
    applyUser,
    currentUser: () => firebase.Auth().currentUser
  }
}
