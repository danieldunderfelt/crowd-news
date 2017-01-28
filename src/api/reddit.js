import axios from 'axios'
import _ from 'lodash'
import subreddits from '../../subreddits'
import { extendObservable, action } from 'mobx'
import storage from '../helpers/storage'
import dateFns from 'date-fns'

export default state => {

  function getUrl(endpoint, paged = true) {
    const { after, count } = state.reddit

    const pagingParams = `&after=${ after }&count=${ count }`
    const requestUrl = `https://www.reddit.com/r/${endpoint}/top.json?nsfw=0&sort=top&t=day`

    console.log(pagingParams)

    return requestUrl + (paged ? pagingParams : '')
  }

  function getPosts() {
    const subredditsStr = subreddits.join('+')

    return axios.get(getUrl(subredditsStr))
      .then(({ data }) => parsePagingData(data))
      .then(parsePostsFromData)
  }

  const parsePagingData = action(response => {
    setPagingData({
      after: response.data.after,
      count: response.data.children.length,
      timestamp: false
    })

    return response
  })

  const setPagingData = (paging, cache = true) => {
    if(!_.get(paging, 'timestamp', false) && paging.count > 0) {
      paging.timestamp = Date.now()
    }

    if(validatePaging(paging)) {
      extendObservable(state, { reddit: paging })

      if(cache) {
        storage.setItem('reddit-paging', paging)
      }
    } else {
      resetPaging()
    }
  }

  function validatePaging(pagingData) {
    // Return false to reset paging on the Reddit feed
    const pagingTs = dateFns.addHours(dateFns.parse(pagingData.timestamp), 1)
    return dateFns.isFuture(pagingTs, new Date())
  }

  function resetPaging(cache = true) {
    const paging = {
      after: '',
      count: 0
    }

    extendObservable(state, { reddit: paging })

    if(cache) {
      storage.setItem('reddit-paging', paging)
    }
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

  function hydratePaging() {
    return storage
      .getItem('reddit-paging')
      .then(data => setPagingData(data, false))
  }

  return {
    getPosts,
    resetPaging,
    hydratePaging
  }
}
