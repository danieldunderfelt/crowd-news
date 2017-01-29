import React, { Component, PropTypes } from 'react'
import { View, Dimensions, StyleSheet, Image, StatusBar } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import BgImage from '../style/BackgroundImageScreen'
import Text from 'react-native-text'
import storage from '../helpers/storage'

const IntroContent = styled(Text)`
  font-size: 16;
  color: white;
  line-height: 25;
`

const CTAContent = styled(IntroContent)`
  font-weight: 700;
`

const FloatingButton = styled(Button)`
  position: absolute;
  top: 20;
  right: 7;
  flex-grow: 1;
  height: 20;
  background-color: transparent;
`

const FloatingLabel = styled(ButtonLabel)`
  color: white;
  font-size: 10;
`

@inject('state', 'auth')
@observer
class IntroScreen extends Component {

  render() {
    const { navigation, state, auth } = this.props

    return (
      <BgImage
        image={ require('../img/intro-bg.jpg') }
        content={(
          <View>
            <IntroContent>
              "Fake News" are news articles that are either completely false, based on half-truths
              or exhibit an overt bias. They're compelling to click on and can be shocking to read.
              Activate your critical thinking and find out how well you can
            </IntroContent>
            <CTAContent>
              spot Fake News!
            </CTAContent>
          </View>
        )}
        bottom={ state.user ? (
          <FloatingButton
            small
            onPress={ () => auth.logOut() }>
            <FloatingLabel>
              Log out?
            </FloatingLabel>
          </FloatingButton>
        ) : null }
        heading="Fake News?!">
        <Button onPress={ () => navigation.navigate('Judge') }>
          <ButtonLabel color="white">
            Start
          </ButtonLabel>
        </Button>
        { __DEV__ ? (
          <View>
            <Button onPress={ () => navigation.navigate('Login') }>
              <ButtonLabel color="white">
                Login
              </ButtonLabel>
            </Button>
            <Button onPress={ () => storage.removeItem('rated-news') }>
              <ButtonLabel color="white">
                Clear cache
              </ButtonLabel>
            </Button>
          </View>
        ) : null }
      </BgImage>
    )
  }
}

export default IntroScreen
