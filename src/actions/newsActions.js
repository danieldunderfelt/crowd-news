import { observable, action, toJS } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'
import database from '../helpers/database'
import storage from '../helpers/storage'
import _ from 'lodash'

export default (state, auth, navigation) => {
  const judgmentsDb = database('judgments')
  const userJudgmentsDb = database('userJudgments')

  function recordJudgment(id, data) {
    const ref = judgmentsDb(id).push()
    const userRef = userJudgmentsDb(state.user.uid).push()

    const userData = {
      ...data,
      articleId: id
    }

    return Promise.all([
      ref.set(data),
      userRef.set(userData)
    ]).catch(err => console.warn(err))
  }

  const newsCollection = collection(state.news, data => Article(data, state), 'Article collection')
  const judgedCollection = collection(state.judgedNews, data => Article(data, state), 'Judged articles')

  const judgeItem = action((judgment, item) => {
    item.judgment = judgment
    judgedCollection.addItem(item)

    auth.doAuthenticated(() => {
      saveJudgment(item)
      this.showResults = false

      if(navigation.state.routeName !== 'Judge') {
        navigation.dispatch({ type: 'Navigation/BACK' })
      }
    }, navigation)
  })

  function saveJudgment(item) {
    cacheJudged([ Object.assign({}, toJS(item, false), { __is_article: false }) ])

    return recordJudgment(item.id, {
      userId: state.user.uid,
      judgment: item.judgment,
      url: item.url
    })
  }

  function cacheJudged(ratedNews) {
    return storage
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
