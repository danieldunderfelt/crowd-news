import { Image } from 'react-native'
import { observable } from 'mobx'
import _ from 'lodash'

export default data => {

  const article = observable({
    id: data.id,
    name: data.name,
    image: _.get(data, 'preview.images[0].source.url', false),
    title: data.title,
    url: data.url
  })

  if(!!article.image) {
    Image
      .prefetch({ source: article.image })
      .catch(err => {})
  }

  return article
}
