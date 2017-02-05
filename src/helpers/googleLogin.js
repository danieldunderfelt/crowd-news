import GoogleSignIn from 'react-native-google-sign-in'

export default () => {

  // First set client ID for ios
  GoogleSignIn.configure({
    offlineAccess: false,
    clientID: '746713077322-ugqph6orahiv7rqtg06mkjglp5cvco8b.apps.googleusercontent.com'
  })

  function login() {
    return GoogleSignIn
      .signInPromise()
      .then(({ accessToken }) => accessToken ) // Extract access token
      .catch(err => {
        console.warn('Google login error:', err)
        return false
      })
  }

  function logout() {
    return GoogleSignIn
      .signOutPromise()
      .then(() => true)
      .catch(err => {
        console.warn('Google login error:', err)
        return false
      })
  }

  return {
    login,
    logout,
    provider: 'google'
  }
}
