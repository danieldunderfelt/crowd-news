import axios from 'axios'
import _ from 'lodash'
import subreddits from '../../subreddits'

export default state => {

  function getUrl(endpoint) {
    return `https://www.reddit.com/r/${endpoint}.json?nsfw=0`
  }

  function getPosts() {
    const subredditsStr = subreddits.join('+')

    return axios.get(getUrl(subredditsStr + '/top.json?sort=top&t=week'))
      .then(({ data }) => parsePostsFromData(data))
  }

  function parsePostsFromData(data) {
    return _.chain(_.get(data, 'data.children'))
      .map(post => post.data)
      .filter(post => (
        post.over_18 === false &&
        post.is_self === false
      ))
      .uniqBy('url')
      .value()
  }

  return {
    getPosts
  }
}
