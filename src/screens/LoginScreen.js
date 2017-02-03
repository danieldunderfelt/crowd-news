import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import _ from 'lodash'
import Button, { ButtonLabel } from '../Button'
import BgImage from '../style/BackgroundImageScreen'
import { ViewHeading, Paragraph } from '../style/typography'
import { ContentBox, Footer } from '../style/content'

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

    return (
      <BgImage image={ require('../img/intro-bg.jpg') }>
        <ViewHeading size={ 60 }>
          { !!state.user ? 'Log out' : 'Log in' }
        </ViewHeading>
        <ContentBox>
          { state.user ? (
            <Paragraph>
              Had enough? Log out with the button below, but do remember to use the same
              login provider when you inevitably come back for more ;)
            </Paragraph>
          ) : (
            <Paragraph>
              Hold up! Before you can continue your campaign of fake news carnage,
              we would like to get to know you. It'll only take a few seconds and we
              do not post on your behalf without permission.
            </Paragraph>
          )}
        </ContentBox>
        <Footer>
          { !!state.user ? (
            <View>
              <Button
                color="black"
                onPress={ () => auth.logOut() }>
                <ButtonLabel color="white">
                  Log out
                </ButtonLabel>
              </Button>
              <Button
                secondary
                color="white"
                onPress={ () => navigation.goBack() }>
                <ButtonLabel color="white">
                  Back
                </ButtonLabel>
              </Button>
            </View>
          ) : (
            <View>
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
            </View>
          )}
        </Footer>
      </BgImage>
    )
  }
}

export default LoginScreen
