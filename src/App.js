import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import { observable, action, toJS } from 'mobx'
import storage from './helpers/storage'
import appActions from './actions/appActions'
import authActions from './actions/authActions'

export default () => {

  const store = observable({
    user: {}
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
      await storage.setItem('state', toJS(store, false))
    }

    render() {
      const { user } = store

      return (
        <View style={{ paddingVertical: 25, paddingHorizontal: 15 }}>
          <Text>
            { JSON.stringify(user, null, 2) }
          </Text>
        </View>
      )
    }
  }

  return App
}
