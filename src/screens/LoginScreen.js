import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'

@inject('auth', 'state')
@observer
class LoginScreen extends Component {

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
              onPress={ () => auth.authenticate('facebook') }>
              <ButtonLabel color="white">
                Login with Facebook
              </ButtonLabel>
            </Button>
            <Button
              background="black"
              onPress={ () => auth.authenticate('google') }>
              <Buttonlabel color="white">
                Login with Google
              </Buttonlabel>
            </Button>
          </View>
        )}
      </View>
    )
  }
}

export default LoginScreen
