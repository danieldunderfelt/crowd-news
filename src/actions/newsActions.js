import { observable, action, when } from 'mobx'
import { collection } from 'mobx-app'
import Article from '../helpers/Article'
import database, { resolveList } from '../helpers/database'
import _ from 'lodash'

export default state => {
  const judgmentsDb = database('judgments')

  async function getJudgements(id) {
    const ref = judgmentsDb(id)
    return await ref.once('value')
  }

  async function recordJudgement(id, data) {
    const ref = judgmentsDb(id).push()
    return await ref.set(data)
  }

  const newsCollection = collection(state.news, Article, 'Article collection')

  const judgeItem = action((judgement, item) => {
    const judgementItem = observable({
      id: item.id,
      judgement,
      truePercentage: 0
    })

    state.judgedNews.push(judgementItem)

    getJudgements(item.id)
      .then(resolveList)
      .then(calculatePercentage)
      .then(action('Set percentage on judgement item', percentage => {
        console.log(percentage)
        judgementItem.truePercentage = percentage
      }))
      .then(() => recordJudgement(item.id, {
        userId: state.user.id,
        judgement,
        url: item.url
      }))
  })

  function calculatePercentage(list) {
    const responses = list.length
    if(responses === 0) return 0

    const trueResponses = list.filter(i => i.judgement).length
    return Math.round((trueResponses / responses) * 100)
  }

  return {
    ...newsCollection,
    judgeItem
  }
}
