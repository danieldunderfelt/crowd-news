import React, { Component, PropTypes } from 'react'
import { AppState } from 'react-native'
import { observer, Provider } from 'mobx-react/native'
import { observable, action, toJS, reaction } from 'mobx'
import authActions from './actions/authActions'
import Routes from './Routes'
import _ from 'lodash'

const store = observable({
  _currentUser: null,
  news: [],
  judgedNews: [],
  reddit: {
    get after() {
      return _.get(_.last(store.judgedNews.slice()), 'name', '')
    },
    get count() {
      return store.judgedNews.length
    }
  },
  get unjudgedNews() {
    return _.chain(this.news.slice())
      .differenceBy(this.judgedNews.slice(), 'id')
      .value()
  },
  get user() {
    if(typeof store._currentUser !== 'function') return store._currentUser
    return store._currentUser()
  }
})

@observer
class App extends Component {
  authActions = {}

  handleClose() {}

  handleOpen() {
    this.authActions = authActions(store)
    store._currentUser = this.authActions.currentUser
  }

  handleStateChange = state => {
    if (state === 'active') {
      this.handleOpen()
    } else if (state === 'background') {
      this.handleClose()
    } else if (state === 'inactive') {
      this.handleClose()
    }
  }

  @action componentDidMount() {
    AppState.addEventListener('change', this.handleStateChange)
    this.handleOpen()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleStateChange)
    this.handleClose()
  }

  render() {

    return (
      <Provider state={ store } >
        <Routes />
      </Provider>
    )
  }
}

export default App
