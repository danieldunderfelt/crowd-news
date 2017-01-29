import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import _ from 'lodash'

@inject('auth', 'state')
@observer
class LoginScreen extends Component {

  handleAuth(provider) {
    const { auth } = this.props
    auth.authenticate(provider)
  }

  componentDidMount() {
    const { state, navigation: { state: { params }}} = this.props

    reaction(() => state.user, user => {
      if(user) _.invoke(params, 'onLoggedIn')
    })
  }

  render() {
    const { auth, state } = this.props

    return (
      <View>
        <Text>
          { state.user ? 'Log out' : 'Log in' }
        </Text>
        { state.user ? (
          <Button
            background="black"
            onPress={ () => auth.logOut() }>
            <ButtonLabel color="white">
              Log out
            </ButtonLabel>
          </Button>
        ) : (
          <View>
            <Button
              background="black"
              onPress={ () => this.handleAuth('facebook') }>
              <ButtonLabel color="white">
                Login with Facebook
              </ButtonLabel>
            </Button>
            <Button
              background="black"
              onPress={ () => this.handleAuth('google') }>
              <ButtonLabel color="white">
                Login with Google
              </ButtonLabel>
            </Button>
          </View>
        )}
      </View>
    )
  }
}

export default LoginScreen
