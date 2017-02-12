import React, { Component, PropTypes } from 'react'
import { View, Dimensions, Platform } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import DualityScreen from '../style/DualityScreen'
import { SwipeWrapper, Footer } from '../style/content'
import SingleCardSwipe from '../helpers/SingleCardSwipe'
import SwipeInstructionGraphic from '../SwipeInstructionGraphic'

@observer
class IntroScreen extends Component {

  render() {
    const { width } = Dimensions.get('window')
    const { navigation } = this.props

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
            subHeading="Real or Fake? You be the judge."
            heading="MEDIA MATCH">
            <Footer>
              <SwipeInstructionGraphic />
            </Footer>
          </DualityScreen>
        </SingleCardSwipe>
      </SwipeWrapper>
    )
  }
}

export default IntroScreen
