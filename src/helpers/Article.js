import { Image } from 'react-native'
import { observable, when } from 'mobx'
import _ from 'lodash'
import hash from './hash'
import database, { resolveList } from '../helpers/database'
import { fromResource } from 'mobx-utils'

const judgmentsDb = database('judgments')

export default (data, state) => {
  if( Object.keys(data).length === 0 ) return false
  if( _.get(data, '__is_article', false) ) return data

  const url = _.get(data, 'url', false)

  // Sanity check
  if(!url) return false

  const id = hash(url)
  const judgmentsRef = judgmentsDb(`${ id }/judgments`)

  function calculatePercentage(list = []) {
    const responses = list.length
    if( responses === 0 ) return 0

    const trueResponses = list.filter(i => {
      // Filter out current user
      return !!i.judgment && i.userId !== state.user.uid
    }).length
    return Math.round((trueResponses / responses) * 100)
  }

  const judgmentResource = fromResource(
    sink => {
      sink(false)

      when(() => !!state.user, () => {
        judgmentsRef.on('value', list => sink(resolveList(list)))
      })
    },
    () => judgmentsRef.off()
  )

  const article = observable({
    __is_article: true,
    id,
    name: data.name,
    image: _.get(data, 'preview.images[0].source.url', false),
    title: data.title,
    url,
    created: data.created,
    judgment: null,
    get judgmentCount() {
      const list = judgmentResource.current()

      if(!list) return 0
      return list.length > 0 ? list.length - 1 : 0 // Remove currently logged in user
    },
    get truePercentage() {
      const list = judgmentResource.current()

      if( !list ) return false
      return calculatePercentage(list)
    }
  })

  if( !!article.image ) {
    
    Image
      .prefetch(article.image)
      .catch(err => { /* ignore :) */ })
  }

  return article
}
