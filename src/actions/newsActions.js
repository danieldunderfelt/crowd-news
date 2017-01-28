import { observable, action, toJS } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'
import database from '../helpers/database'
import storage from '../helpers/storage'
import _ from 'lodash'

export default state => {
  const judgmentsDb = database('judgments')

  async function setData(id, data) {
    const ref = judgmentsDb(id).push()
    return await ref.set(data)
  }

  const newsCollection = collection(state.news, Article, 'Article collection')
  const judgedCollection = collection(state.judgedNews, Article, 'Judged articles')

  const judgeItem = action((judgment, item) => {
    item.judgment = judgment
    judgedCollection.addItem(item)
  })

  function saveJudgment(item) {
    setData(item.id, {
      userId: state.user.id,
      judgment: item.judgment,
      url: item.url
    })

    persistJudged([ Object.assign({}, toJS(item, false), { __is_article: false }) ])
  }

  function persistJudged(ratedNews) {
    storage
      .getItem('rated-news')
      .then(rated => {
        const next = { ratedNews: _.get(rated, 'ratedNews', []).concat(ratedNews) }
        console.log(rated)
        return next
      })
      .then(saveItems => storage.setItem('rated-news', saveItems))
  }

  function hydrateRated(rated) {
    console.log(rated)
    judgedCollection.addItems(_.get(rated, 'ratedNews', []))
  }

  storage
    .getItem('rated-news')
    .then(hydrateRated)

  return {
    ...newsCollection,
    judgeItem,
    saveJudgment,
    persistJudged
  }
}
