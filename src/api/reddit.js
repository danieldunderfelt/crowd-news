import { Platform } from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import subreddits from '../../subreddits'
import { extendObservable, action, observable } from 'mobx'
import normalizeUrl from 'normalize-url'

const appId = Platform.select({
  ios: 'com.developsuperpowers.FakeNews',
  android: 'com.danieldunderfelt.mediamatch'
})

export default state => {

  function getUrl(endpoint, paged = true) {
    const { after, count } = state.reddit

    const pagingParams = `&limit=10&after=${ after }&count=${ count }`
    const requestUrl = `https://www.reddit.com/r/${endpoint}/top.json?nsfw=0&sort=top&t=day`

    return requestUrl + (paged ? pagingParams : '')
  }

  function getPosts(paging = true) {
    const subredditsStr = subreddits.join('+')

    return axios
      .get(getUrl(subredditsStr, paging), {
        headers: { 'User-Agent': `${ Platform.OS }:${ appId }:1.0.0 (by /u/fieldOfThunder)` }
      })
      .then(({ data }) => parsePostsFromData(data))
  }

  function parsePostsFromData(data) {
    const posts = _.get(data, 'data.children', [])

    if(!posts.length) {
      return getPosts(false)
    }

    return _.chain(posts)
      .map(post => post.data)
      .filter(post => (
        post.over_18 === false &&
        post.is_self === false &&
        post.post_hint === 'link'
      ))
      .map(post => Object.assign({}, post, { url: normalizeUrl(_.get(post, 'url', 'no://url')) }))
      .uniqBy('url')
      .value()
  }

  return {
    getPosts
  }
}
