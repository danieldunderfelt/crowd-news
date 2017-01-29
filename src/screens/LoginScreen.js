import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import _ from 'lodash'
import Button, { ButtonLabel } from '../Button'

import Screen from '../style/Screen'
import Text from 'react-native-text'

const Wrapper = styled(Screen)`
  position: relative;
`

const IntroBg = styled.Image`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const ContentWrapper = styled.View`
  padding: 20;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.33);
`

const AppHeading = styled(Text)`
  font-size: 90;
  font-weight: 900;
  margin: 30 0;
  color: white;
  line-height: 90;
  background-color: transparent;
`

const IntroContent = styled(Text)`
  font-size: 16;
  color: white;
  line-height: 25;
`

const CTAContent = styled(IntroContent)`
  font-weight: 700;
`

const IntroBox = styled.View`
  padding: 20 20;
  border-width: ${ 2 };
  border-color: white;
  background-color: rgba(0, 0, 0, 0.66);
`

const Footer = styled.View`
  flex-grow: 1;
  justify-content: flex-end;
`

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
