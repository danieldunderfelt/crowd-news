import React, { Component, PropTypes } from 'react'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import _ from 'lodash'
import Button, { ButtonLabel } from '../Button'
import DualityScreen from '../style/DualityScreen'
import { Footer } from '../style/content'
import styled from 'styled-components/native'
import LoadingScreen from '../LoadingScreen'

const Padding = styled.View`
  padding: 20;
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
    const { auth, state, navigation } = this.props

    return state.authLoading ? (
        <LoadingScreen
          loadingText="Logging in..."
          bg="black" />
      ) : (
      <DualityScreen
        subHeading={ !!state.user ? "You'll be back." : "To enjoy Media Match." }
        heading={ !!state.user ? 'LOG OUT?' : 'LOG IN!' }>
        <Footer>
          { !!state.user ? (
            <Padding>
              <Button
                color="black"
                onPress={ () => auth.logOut() }>
                <ButtonLabel color="white">
                  Log out
                </ButtonLabel>
              </Button>
              <Button
                secondary
                color="black"
                onPress={ () => navigation.goBack() }>
                <ButtonLabel color="black">
                  Back
                </ButtonLabel>
              </Button>
            </Padding>
          ) : (
            <Padding>
              <Button
                color="black"
                onPress={ () => this.handleAuth('facebook') }>
                <ButtonLabel color="white">
                  Login with Facebook
                </ButtonLabel>
              </Button>
              <Button
                color="black"
                onPress={ () => this.handleAuth('google') }>
                <ButtonLabel color="white">
                  Login with Google
                </ButtonLabel>
              </Button>
            </Padding>
          )}
        </Footer>
      </DualityScreen>
    )
  }
}

export default LoginScreen
