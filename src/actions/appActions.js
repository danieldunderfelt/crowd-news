import { extendObservable, action } from 'mobx'

export default (state, initialData = {}) => {
  extendObservable(state, initialData)



  return {

  }
}
