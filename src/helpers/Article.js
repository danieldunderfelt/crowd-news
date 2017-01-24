import { observable } from 'mobx'
import _ from 'lodash'

export default data => {

  return observable({
    id: data.id,
    name: data.name,
    image: _.get(data, 'preview.images[0].source.url', false),
    title: data.title,
    url: data.url
  })
}
