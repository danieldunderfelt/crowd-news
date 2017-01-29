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
  background-color: #212121;
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
  color: #ccc;
  font-size: 30;
  font-weight: 300;
  text-align: center;
  padding: 0 20;
`

const JudgmentWord = styled(ResultHeading)`
  font-weight: 900;
  font-size: 32;
`

const JudgedHeading = styled(Text)`
  color: white;
  font-size: 14;
  font-weight: 200;
  text-align: center;
  padding: 40 20 10 20;
  margin-bottom: 30;
  background-color: black;
`

const ResultWord = styled(ResultHeading)`
  font-size: 120;
  color: white;
  font-weight: 900;
  margin: 30 0;
`

const ContinueButton = styled(Button)`
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

    console.log(responses, percent)

    const displayPercentage = yourJudgment === true ? percent : 100 - percent
    const displayWord = yourJudgment === true ? 'REAL' : 'FAKE'

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
          { displayPercentage === 0 && responses > 0 ? (
            <View>
              <ResultHeading>
                You're the first who rated this article
              </ResultHeading>
              <ResultWord>
              { displayWord }
              </ResultWord>
            </View>
          ) : responses === 0 ? (
            <View>
              <ResultHeading>
                You're the first one to rate this article!
              </ResultHeading>
            </View>
          ) : (
            <View>
              <ResultHeading>
                You rated this article <JudgmentWord>{ displayWord }</JudgmentWord> along with
              </ResultHeading>
              <ResultWord>
                { displayPercentage }%
              </ResultWord>
              <ResultHeading>
                of others who have rated this article.
              </ResultHeading>
            </View>
          )}
          <ContinueButton
            color="white"
            onPress={ () => this.props.onDone(judgedArticle) }>
            <ButtonLabel color="black">
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
