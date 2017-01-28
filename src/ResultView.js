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
  background-color: black;
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
  color: black;
  font-size: 14;
  font-weight: 200;
  text-align: center;
  padding: 10 20;
  background-color: white;
`

const ResultWord = styled(ResultHeading)`
  font-size: 120;
  font-weight: 700;
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
              You{ responses > 0 ? ` and ${ displayPercentage }% of other users` : '' } rated it as
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
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-7905807201378145/6576693799"
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={ action(() => this.showAd = false ) } />
        ) : null }
      </ViewWrapper>
    )
  }
}

export default ResultView
