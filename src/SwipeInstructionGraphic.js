import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import Text from 'react-native-text'

const swipeLeft = require('./img/swipe_left.png')
const swipeRight = require('./img/swipe_right.png')

const SwipeWrapper = styled(Animatable.View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 50 0 30;
`

const MiddleWord = styled(Text)`
  color: white;
  font-weight: 900;
  background-color: transparent;
`

const SwipeImg = styled.Image`
  width: 120;
  height: 120;
  margin-right: -20;
  margin-left: -20;
`

@observer
class SwipeInstructionGraphic extends Component {

  render() {

    return (
      <SwipeWrapper
        useNativeDriver
        delay={ 2500 }
        duration={ 1500 }
        animation="pulse"
        easing="ease-in-out"
        iterationCount="infinite">
        <SwipeImg source={ swipeLeft } />
        <MiddleWord>
          OR
        </MiddleWord>
        <SwipeImg source={ swipeRight } />
      </SwipeWrapper>
    )
  }
}

export default SwipeInstructionGraphic
