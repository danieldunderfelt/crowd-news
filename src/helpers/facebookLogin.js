import { FBLoginManager } from 'react-native-facebook-login'

export default () => {

  function login(permissions) {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
        if (!error) {
          resolve(data.credentials.token)
        } else {
          reject(error)
        }
      })
    })
  }

  function logout() {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if (!error) {
          resolve(true)
        } else {
          reject(error)
        }
      })
    })
  }

  return {
    login,
    logout,
    provider: 'facebook'
  }
}
