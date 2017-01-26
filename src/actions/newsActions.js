import { observable, action, when } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'
import database, { resolveList } from '../helpers/database'

export default state => {
  const judgmentsDb = database('judgments')

  async function setData(id, data) {
    const ref = judgmentsDb(id).push()
    return await ref.set(data)
  }

  const newsCollection = collection(state.news, Article, 'Article collection')

  const judgeItem = action((judgment, item) => {
    item.judgment = judgment
    state.judgedNews.push(item)
  })

  function saveJudgment(item) {
    setData(item.id, {
      userId: state.user.id,
      judgment: item.judgment,
      url: item.url
    })
  }

  return {
    ...newsCollection,
    judgeItem,
    saveJudgment
  }
}
