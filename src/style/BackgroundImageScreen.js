import React from 'react'
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Screen from './Screen'

const Wrapper = styled(Screen)`
  position: relative;
`

const BgImage = styled.Image`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const ContentWrapper = styled.View`
  padding: 20 10 20 10;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.2);
`

export default observer(props => {
  const { height, width } = Dimensions.get('window')

  return (
    <Wrapper bg="white">
      <BgImage
        width={ width }
        height={ height }
        resizeMode="cover"
        style={ StyleSheet.absoluteFill }
        source={ props.image } />
      <StatusBar
        translucent
        showHideTransition="fade"
        barStyle="light-content" />
      <ContentWrapper>
        { props.children }
      </ContentWrapper>
    </Wrapper>
  )
})
