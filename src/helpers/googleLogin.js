import { GoogleSignin } from 'react-native-google-signin'

export default () => {

  // First set client ID for ios
  GoogleSignin.configure({
    iosClientId: '746713077322-ugqph6orahiv7rqtg06mkjglp5cvco8b.apps.googleusercontent.com'
  })

  function login() {
    return GoogleSignin
      .signIn()
      .then(({ accessToken }) => accessToken ) // Extract access token
      .catch(err => {
        console.warn('Google login error:', err)
        return false
      })
  }

  function logout() {
    return GoogleSignin
      .signOut()
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
