import axios from 'axios'
import _ from 'lodash'

export default state => {

  function getUrl(endpoint) {
    return `https://www.reddit.com/r/${endpoint}.json?nsfw=0`
  }

  function getPosts() {
    return axios.get(getUrl('worldnews+news+europe'))
      .then(({ data }) => parsePostsFromData(data))
  }

  function parsePostsFromData(data) {
    return _.chain(_.get(data, 'data.children'))
      .map(post => post.data)
      .filter(post => (
        post.over_18 === false &&
        post.is_self === false
      ))
      .value()
  }

  return {
    getPosts
  }
}
