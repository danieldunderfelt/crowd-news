import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import _ from 'lodash'
import Button, { ButtonLabel } from '../Button'
import Text from 'react-native-text'
import BgImage from '../style/BackgroundImageScreen'


const TextContent = styled(Text)`
  font-size: 16;
  color: white;
  line-height: 25;
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
      <BgImage
        image={ require('../img/intro-bg.jpg') }
        content={(
          <TextContent>
            Hoold up! Before you can continue your campaign of fake news carnage,
            we would like to get to know you. Pick either Facebook or Google and
            log in, It'll only take a few seconds!
          </TextContent>
        )}
        headingSize={ 60 }
        heading="Who are you?">
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
      </BgImage>
    )
  }
}

export default LoginScreen
