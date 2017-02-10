import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Text, { Black } from './style/typography'

const SwipeGraphic = styled(Animated.View)`
  position: absolute;
  padding: 200 20 20 20;
  top: 0;
  left: -200;
  right: -200;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ color = 'white' }) => color };
`

const SwipeText = styled(Black)`
  color: ${({ color }) => color === 'white' ? 'black' : 'white' };
  font-size: 72;
  text-align: center;
`

export default observer(props => {
  const { style, side, label, textStyle, color } = props

  return (
    <SwipeGraphic
      pointerEvents="none"
      label={ label }
      side={ side }
      color={ color }
      style={ style }>
      <SwipeText style={ textStyle } color={ color }>
        { label }
      </SwipeText>
    </SwipeGraphic>
  )
})
