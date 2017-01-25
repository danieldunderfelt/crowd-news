import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, Provider } from 'mobx-react/native'
import styled from 'styled-components/native'
import { observable, action, toJS } from 'mobx'
import storage from './helpers/storage'
import appActions from './actions/appActions'
import authActions, { userModel } from './actions/authActions'
import JudgmentView from './JudgmentView'
import _ from 'lodash'

export default () => {

  const store = observable({
    user: userModel(),
    news: [],
    judgedNews: [],
    get unjudgedNews() {
      return _.chain(this.news.slice())
        .differenceBy(this.judgedNews, 'id')
        .value()
    }
  })

  @observer
  class App extends Component {

    appActions = {}
    authActions = {}

    async componentDidMount() {
      const prevState = await storage.getItem('state')
      // appActions initializes state with initial data if available
      this.appActions = appActions(store, prevState)

      // Set up authActions and authenticate user
      this.authActions = authActions(store)
      this.authActions.authenticate()
    }

    async componentWillUnmount() {
      console.log('yo')
      await storage.setItem('state', toJS(store, false))
    }

    render() {

      return (
        <Provider state={ store } app={ this.appActions } >
          <JudgmentView />
        </Provider>
      )
    }
  }

  return App
}
