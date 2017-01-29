import { observable, action, toJS } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'
import database from '../helpers/database'
import storage from '../helpers/storage'
import _ from 'lodash'

export default state => {
  const judgmentsDb = database('judgments')

  async function recordJudgment(id, data) {
    const ref = judgmentsDb(id).push()
    return await ref.set(data)
      .catch(err => console.warn(err))
  }

  const newsCollection = collection(state.news, Article, 'Article collection')
  const judgedCollection = collection(state.judgedNews, Article, 'Judged articles')

  const judgeItem = action((judgment, item) => {
    item.judgment = judgment
    judgedCollection.addItem(item)

    if(!!state.user) {
      saveJudgment(item)
    } else {
      // Show login screen
    }
  })

  function saveJudgment(item) {
    recordJudgment(item.id, {
      userId: state.user.uid,
      judgment: item.judgment,
      url: item.url
    })

    cacheJudged([ Object.assign({}, toJS(item, false), { __is_article: false }) ])
  }

  function cacheJudged(ratedNews) {
    storage
      .getItem('rated-news')
      .then(rated => ({ ratedNews: _.get(rated, 'ratedNews', []).concat(ratedNews) }))
      .then(saveItems => storage.setItem('rated-news', saveItems))
  }

  function hydrateJudged() {
    return storage
      .getItem('rated-news')
      .then(rated => {
        judgedCollection.addItems(_.get(rated, 'ratedNews', []))
      })
  }

  return {
    ...newsCollection,
    judgeItem,
    saveJudgment,
    cacheJudged,
    hydrateJudged
  }
}
