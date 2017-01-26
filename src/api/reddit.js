import axios from 'axios'
import _ from 'lodash'
import subreddits from '../../subreddits'

export default state => {

  function getUrl(endpoint) {
    return `https://www.reddit.com/r/${endpoint}/top.json?nsfw=0&sort=top&t=day`
  }

  function getPosts() {
    const subredditsStr = subreddits.join('+')

    return axios.get(getUrl(subredditsStr))
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
