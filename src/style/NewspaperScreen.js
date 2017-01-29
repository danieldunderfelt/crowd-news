import React from 'react'
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Text from 'react-native-text'
import Screen from './Screen'

const Wrapper = styled(Screen)`
  position: relative;
`

const BgImage = styled.Image`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const ContentWrapper = styled.View`
  padding: 20;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.33);
`

const AppHeading = styled(Text)`
  font-size: ${({ size = 90 }) => size };
  font-weight: 900;
  margin: 30 0;
  color: white;
  line-height: 90;
  background-color: transparent;
`

const ContentBox = styled.View`
  padding: 20 20;
  border-width: ${ 2 };
  border-color: white;
  background-color: rgba(0, 0, 0, 0.66);
`

const Footer = styled.View`
  flex-grow: 1;
  justify-content: flex-end;
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
        source={ require('../img/intro-bg.jpg') } />
      <StatusBar
        translucent
        showHideTransition="fade"
        barStyle="dark-content" />
      <ContentWrapper>
        <AppHeading size={ props.headingSize }>
          { props.heading }
        </AppHeading>
        <ContentBox>
          { props.content }
        </ContentBox>
        <Footer>
          { props.children }
        </Footer>
      </ContentWrapper>
      { props.bottom }
    </Wrapper>
  )
})
