import React, { Component, PropTypes } from 'react'
import { AppState } from 'react-native'
import { observer, Provider } from 'mobx-react/native'
import { observable, action, toJS, reaction } from 'mobx'
import authActions from './actions/authActions'
import Routes from './Routes'
import _ from 'lodash'
import codePush from 'react-native-code-push'
import { startLogging } from './helpers/mobxLogger'

const store = observable({
  _currentUser: null,
  news: [],
  judgedNews: [],
  authLoading: false,
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

//startLogging({ collapsed: true, ignore: [ 'timer', 'ignore' ] })

@codePush
@observer
class App extends Component {
  authActions = authActions(store)

  handleClose() {}
  handleOpen() {}

  handleStateChange = state => {
    if (state === 'active') {
      this.handleOpen()
    } else if (state === 'background') {
      this.handleClose()
    } else if (state === 'inactive') {
      this.handleClose()
    }
  }

  componentDidMount() {

    AppState.addEventListener('change', this.handleStateChange)
    this.handleOpen()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleStateChange)
    this.handleClose()
  }

  render() {

    return (
      <Provider state={ store } auth={ this.authActions } >
        <Routes />
      </Provider>
    )
  }
}

export default App
