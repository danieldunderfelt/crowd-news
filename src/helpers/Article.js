import { Image } from 'react-native'
import { observable } from 'mobx'
import _ from 'lodash'
import normalizeUrl from 'normalize-url'
import hash from './hash'

export default data => {
  if(Object.keys(data).length === 0) return {}
  const url = normalizeUrl(_.get(data, 'url', 'fuck://off'))

  const article = observable({
    id: hash(url),
    name: data.name,
    image: _.get(data, 'preview.images[0].source.url', false),
    title: data.title,
    url
  })

  if(!!article.image) {
    Image
      .prefetch({ source: article.image })
      .catch(err => { /* ignore :) */ })
  }

  return article
}
