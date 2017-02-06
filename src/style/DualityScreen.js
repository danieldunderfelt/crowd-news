import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import Text from '../style/typography'

const Wrapper = styled.View`
  width: ${({ size }) => size.width };
  height: ${({ size }) => size.height };
  position: relative;
  flex-grow: 1;
  background-color: ${({ color }) => color };
`

const SplitPart = styled(Animatable.View)`
  background-color: ${({ color = 'black' }) => color };
  width: ${({ size }) => size.width * 2 };
  height: ${({ size }) => size.height * 4 };
  position: absolute;
  left: 0;
  top: -${({ size }) => size.height };
  transform: rotate(29.25deg) ${({ size }) => `translateX(-${ size.width / 2.85 }) translateY(${ size.height / 2 })` };
`

const FloatingContent = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const Content = styled(Animatable.View)`
  width: ${({ size }) => size.height + (size.height / 2.33) };
  height: 95;
  position: absolute;
  top: 0;
  left: ${({ size }) => size.width / 2 };
  z-index: 10;
  transform: rotate(-60.75deg) translateX(-${({ size }) => size.width * 1.282 }) translateY(${({ size }) => size.height / 2.33 });
  background-color: transparent;
`

const Heading = styled(Text)`
  font-size: 70;
  line-height: 85;
  font-weight: 900;
  text-align: center;
  margin: 0;
  color: ${({ color }) => color };
`

const SubHeading = styled(Heading)`
  font-size: 24;
  line-height: 28;
  font-weight: 400;
  margin-top: -12;
  text-align: center;
`

@observer
class DualityScreen extends Component {

  render() {
    const size = Dimensions.get('window')
    const { children, heading, subHeading, subHeadingColor = 'black', topColor = 'black', bottomColor = 'white', headingColor = 'white' } = this.props

    return (
      <Wrapper size={ size } color={ topColor }>
        <StatusBar
          translucent
          showHideTransition="fade"
          barStyle={ topColor === 'black' ? 'light-content' : 'dark-content' } />
        <SplitPart size={ size } color={ bottomColor } />
        <Content size={ size }>
          <Heading color={ headingColor }>
            { heading }
          </Heading>
          <SubHeading color={ subHeadingColor }>
            { subHeading }
          </SubHeading>
        </Content>
        <FloatingContent>
          { children }
        </FloatingContent>
      </Wrapper>
    )
  }
}

export default DualityScreen
