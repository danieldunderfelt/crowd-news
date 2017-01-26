import { autorun, isObservable } from 'mobx'
import firebase from '../api/firebase'
const db = firebase.database()

export default (collection) => {

  return (key = false) => {
    if(!key) {
      return db.ref(collection)
    }

    return db.ref(`${ collection }/${ key }`)
  }
}

export function resolveList(list) {
  const all = []

  list.forEach(i => {
    all.push(i.val())
  })

  return all
}
