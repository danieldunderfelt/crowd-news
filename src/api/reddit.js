import axios from 'axios'
import _ from 'lodash'
import subreddits from '../../subreddits'
import { extendObservable, action } from 'mobx'

export default state => {

  function getUrl(endpoint, paged = true) {
    const { after, count } = state.reddit

    const pagingParams = `&after=${ after }&count=${ count }`
    const requestUrl = `https://www.reddit.com/r/${endpoint}/top.json?nsfw=0&sort=top&t=day`

    return requestUrl + (paged ? pagingParams : '')
  }

  function getPosts() {
    const subredditsStr = subreddits.join('+')

    return axios
      .get(getUrl(subredditsStr))
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
