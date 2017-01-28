import React, { Component, PropTypes } from 'react'
import { AppState } from 'react-native'
import { observer, Provider } from 'mobx-react/native'
import { observable, action, toJS, reaction } from 'mobx'
import authActions, { firebaseUser } from './actions/authActions'
import JudgmentView from './JudgmentView'
import _ from 'lodash'

const store = observable({
  user: firebaseUser(),
  news: [],
  judgedNews: [],
  reddit: {
    get after() {
      return _.get(_.last(store.judgedNews.slice), 'name', '')
    },
    get count() {
      return store.judgedNews.length
    }
  },
  get unjudgedNews() {
    return _.chain(this.news.slice())
      .differenceBy(this.judgedNews.slice(), 'id')
      .value()
  }
})

@observer
class App extends Component {
  authActions = {}

  handleClose() {
    this.authActions.persistUser()
  }

  async handleOpen() {
    // Set up authActions and authenticate user
    this.authActions = authActions(store)
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
      <Provider state={ store } >
        <JudgmentView />
      </Provider>
    )
  }
}

export default App
