import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Text from 'react-native-text'

const SwipeGraphic = styled(Animated.View)`
  position: absolute;
  padding: 20 20 200 20;
  bottom: 0;
  left: -200;
  right: -200;
  background-color: ${({ label }) => label === 'REAL!' ? 'white' : 'black' };
`

const SwipeText = styled(Text)`
  color: ${({ label }) => label === 'REAL!' ? 'black' : 'white' };
  font-size: 72;
  font-weight: 900;
  text-align: center;
`

export default observer(props => {
  const { style, side, label } = props

  return (
    <SwipeGraphic
      pointerEvents="none"
      label={ label }
      side={ side }
      style={ style }>
      <SwipeText label={ label }>
        { label }
      </SwipeText>
    </SwipeGraphic>
  )
})
