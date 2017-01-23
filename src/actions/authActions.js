import { reaction, observable, action, extendObservable } from 'mobx'
import { fromResource } from 'mobx-utils'
import firebase from '../../firebase'

const userModel = (data = {
  id: false,
  refreshToken: '',
  isAnonymous: true,
  token: '',
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

export default state => {

  const authStateObservable = fromResource(sink => {
    firebase.auth().onAuthStateChanged(sink)
  })

  function authenticate() {
    if(state.user.id !== false) return false

    return firebase.auth()
      .signInAnonymously()
      .catch(err => {
        console.warning(err)
      })
  }

  const setUser = action('Set user', user => {
    extendObservable(state, { user: userModel(user) })
  })

  reaction(authStateObservable.current, user => {
    setUser(userModel(user ? user : undefined))
  })

  return {
    authenticate,
    currentUser: () => firebase.Auth().currentUser
  }
}
