import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import Text from 'react-native-text'

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
  width: ${({ size }) => size.height };
  position: absolute;
  top: ${({ size }) => Platform.OS === 'android' ? size.height / 2.8 : size.height / 2.5 };
  left: -${({ size }) => Platform.OS === 'android' ? size.width / 2.63 : size.width / 2.65 };
  z-index: 10;
  transform: rotate(-60.75deg)
  background-color: transparent;
`

const Heading = styled(Text)`
  font-size: 70;
  line-height: 80;
  font-weight: 900;
  text-align: center;
  color: ${({ color }) => color };
`

const SubHeading = styled(Heading)`
  font-size: 24;
  line-height: 34;
  font-weight: 300;
  text-align: center;
`

@observer
class DualityScreen extends Component {

  render() {
    const size = Dimensions.get('window')
    const { children, heading, subHeading, subHeadingColor = 'black', topColor = 'black', bottomColor = 'white', headingColor = 'white' } = this.props

    return (
      <Wrapper size={ size } color={ topColor }>
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
