import { autorun, isObservable } from 'mobx'
import firebase from '../api/firebase'
const db = firebase.database()

export default (collection) => {
  const collectionName = __DEV__ ? 'DEV-' + collection : collection

  return (key = false) => {
    if(!key) return db.ref(collectionName)
    return db.ref(`${ collectionName }/${ key }`)
  }
}

export function resolveList(list) {
  const all = []

  list.forEach(i => {
    all.push(i.val())
  })

  return all
}
