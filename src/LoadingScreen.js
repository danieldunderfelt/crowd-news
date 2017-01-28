import React, { Component, PropTypes } from 'react'
import { Dimensions, LayoutAnimation } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Progress from 'react-native-progress/CircleSnail'
import Text from 'react-native-text'
import layoutAnim, { fade } from './helpers/layoutAnim'

const SpinnerWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${({ bg }) => bg };
`

const LoadingText = styled(Text)`
  font-size: 16;
  color: white;
  font-weight: 300;
  margin-top: 30;
`

@observer
class LoadingScreen extends Component {

  componentWillMount() {
    LayoutAnimation.configureNext(fade)
  }

  componentWillUnmount() {
    LayoutAnimation.configureNext(layoutAnim)
  }

  render() {
    const { loadingText = 'Loading...', bg = 'black' } = this.props

    return (
      <SpinnerWrapper bg={ bg }>
        <Progress
          color="white"
          size={ 100 }
          indeterminate />
        <LoadingText>
          { loadingText }
        </LoadingText>
      </SpinnerWrapper>
    )
  }
}

export default LoadingScreen
