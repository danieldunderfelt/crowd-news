import { AsyncStorage } from 'react-native'

export default (() => {
  const APP_PREFIX = '@fakenewsapp:'

  function _getKey(key) {
    return APP_PREFIX + key
  }

  function getItem(key) {
    return AsyncStorage
      .getItem(_getKey(key))
      .then(JSON.parse)
  }

  function setItem(key, value) {
    return Promise.resolve(value)
      .then(JSON.stringify)
      .then(strVal => AsyncStorage.setItem(_getKey(key), strVal))
  }

  function removeItem(key) {
    return AsyncStorage.removeItem(_getKey(key))
  }

  return {
    getItem,
    setItem,
    removeItem
  }
})()
