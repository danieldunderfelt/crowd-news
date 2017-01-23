import { action } from 'mobx'
import { collection } from 'mobx-app'
import News from '../helpers/News'

export default state => {

  const newsCollection = collection(state.news, News, 'News collection')

  return {
    ...newsCollection
  }
}
