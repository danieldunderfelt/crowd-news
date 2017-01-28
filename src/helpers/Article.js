import { Image } from 'react-native'
import { observable } from 'mobx'
import _ from 'lodash'
import normalizeUrl from 'normalize-url'
import hash from './hash'
import database, { resolveList } from '../helpers/database'
import { fromResource } from 'mobx-utils'

const judgmentsDb = database('judgments')

export default data => {
  if( Object.keys(data).length === 0 ) return {}

  const url = normalizeUrl(_.get(data, 'url', 'fuck://off'))
  const id = hash(url)
  const judgmentsRef = judgmentsDb(id)

  function calculatePercentage(list = []) {
    const responses = list.length
    if( responses === 0 ) return 0

    const trueResponses = list.filter(i => i.judgment).length
    return Math.round((trueResponses / responses) * 100)
  }

  const judgmentResource = fromResource(
    sink => {
      sink(false)
      judgmentsRef.on('value', list => sink(resolveList(list)))
    },
    () => judgmentsRef.off()
  )

  const article = observable({
    id,
    name: data.name,
    image: _.get(data, 'preview.images[0].source.url', false),
    title: data.title,
    url,
    judgment: null,
    get judgmentCount() {
      const list = judgmentResource.current()

      console.log(list)

      if(!list) return 0
      return list.length
    },
    get truePercentage() {
      const list = judgmentResource.current()

      if( !list ) return false
      return calculatePercentage(list)
    }
  })

  if( !!article.image ) {
    Image
      .prefetch({ source: article.image })
      .catch(err => { /* ignore :) */
      })
  }

  return article
}
