import { action } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'
import _ from 'lodash'

export default state => {

  const newsCollection = collection(state.news, Article, 'Article collection')

  const judgeItem = action((judgement, item) => {
    state.judgedNews.push({
      id: item.id,
      judgement
    })
  })

  return {
    ...newsCollection,
    judgeItem
  }
}
