import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { observable, action } from 'mobx'
import styled from 'styled-components/native'
import _ from 'lodash'
import Text from 'react-native-text'
import LoadingScreen from './LoadingScreen'
import Button, { ButtonLabel } from './Button'
import { AdMobBanner } from 'react-native-admob'

const ResultsWrapper = styled.View`
  height: ${({ height }) => height };
  justify-content: space-around;
  background-color: #121212;
`

const ViewWrapper = styled.View`
  flex-grow: 1;
  align-self: stretch;
  justify-content: center;
`

const Ad = styled(AdMobBanner)`
  flex-grow: 1;
  height: 50;
`

const ResultHeading = styled(Text)`
  color: white;
  font-size: 36;
  font-weight: 300;
  text-align: center;
`

const JudgedHeading = styled(Text)`
  color: white;
  font-size: 14;
  font-weight: 200;
  text-align: center;
  padding: 10 20;
  background-color: black;
`

const ResultWord = styled(ResultHeading)`
  font-size: 120;
  font-weight: 900;
`

const ContinueButton = styled(Button)`
  background-color: white;
  margin: 50 50 0;
`

@inject('state')
@observer
class ResultView extends Component {

  @observable showAd = true

  render() {
    const { height } = Dimensions.get('window')
    const { judgedNews } = this.props.state

    const judgedArticle = _.last(judgedNews.slice())
    const { judgment: yourJudgment, truePercentage: percent, judgmentCount: responses } = judgedArticle

    const displayPercentage = yourJudgment === true ? percent : 100 - percent
    const displayWord = yourJudgment === true ? 'REAL!' : 'FAKE!'

    let displayMessage

    if(displayPercentage === 0 && responses > 0) {
      displayMessage = "You're the only one so far who rated it as"
    } else if(responses === 0) {
      displayMessage = "You rated it as"
    } else {
      displayMessage = `You and ${ displayPercentage }% others rated it as`
    }

    return percent === false ? (
        <LoadingScreen
          loadingText="Loading results..."
          bg="black" />
    ) : (
      <ViewWrapper style={ StyleSheet.absoluteFill }>
        <ResultsWrapper height={ this.showAd ? height - 50 : height }>
          <JudgedHeading>
            { judgedArticle.title }
          </JudgedHeading>
          <View>
            <ResultHeading>
              { displayMessage }
            </ResultHeading>
            <ResultWord>
              { displayWord }
            </ResultWord>
          </View>
          <ContinueButton
            onPress={ () => this.props.onDone(judgedArticle) }>
            <ButtonLabel>
              { 'Ok, next!'.toUpperCase() }
            </ButtonLabel>
          </ContinueButton>
        </ResultsWrapper>
        { this.showAd ? (
          <Ad
            bannerSize="smartBannerLandscape"
            adUnitID="ca-app-pub-7905807201378145/6576693799"
            testDeviceID={ __DEV__ ? "EMULATOR" : false }
            didFailToReceiveAdWithError={ action(() => this.showAd = false ) } />
        ) : null }
      </ViewWrapper>
    )
  }
}

export default ResultView
