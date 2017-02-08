import React, { Component, PropTypes } from 'react'
import { View, Dimensions, Platform } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import DualityScreen from '../style/DualityScreen'
import { SwipeWrapper, Footer } from '../style/content'
import SingleCardSwipe from '../helpers/SingleCardSwipe'
import SwipeInstructionGraphic from '../SwipeInstructionGraphic'

const FloatingButton = styled(Button)`
  position: absolute;
  top: ${ Platform.OS === 'android' ? 50 : 50 };
  right: ${ Platform.OS === 'android' ? 30 : 0 };
  flex-grow: 1;
  height: 20;
  background-color: transparent;
  transform: rotate(-60.75deg);
`

const FloatingLabel = styled(ButtonLabel)`
  color: white;
  font-size: 10;
`

@inject('state', 'auth')
@observer
class IntroScreen extends Component {

  render() {
    const { width } = Dimensions.get('window')
    const { navigation, auth, state } = this.props

    return (
      <SwipeWrapper color="white" width={ width } >
        <SingleCardSwipe
          bgColor="white"
          rightText="START!"
          leftText={ __DEV__ ? 'Login' : "START!" }
          onRight={ () => navigation.navigate('Judge') }
          onLeft={ () => navigation.navigate(__DEV__ ? 'Login' : 'Judge') }>
          <DualityScreen
            topColor="white"
            bottomColor="black"
            subHeadingColor="white"
            headingColor="black"
            subHeading="Can you spot Fake News?"
            heading="MEDIA MATCH">
            <Footer>
              <SwipeInstructionGraphic />
            </Footer>
          </DualityScreen>
        </SingleCardSwipe>
        { state.user ? (
            <FloatingButton
              small
              onPress={ () => auth.logOut() }>
              <FloatingLabel>
                Log out?
              </FloatingLabel>
            </FloatingButton>
          ) : null }
      </SwipeWrapper>
    )
  }
}

export default IntroScreen
