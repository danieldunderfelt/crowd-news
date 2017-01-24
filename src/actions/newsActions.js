import { action } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'

export default state => {

  const newsCollection = collection(state.news, Article, 'Article collection')

  return {
    ...newsCollection
  }
}
