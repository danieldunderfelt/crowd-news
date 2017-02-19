import React, { Component, PropTypes } from 'react'
import { View, Platform, Image, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { observable, action } from 'mobx'
import styled from 'styled-components/native'
import _ from 'lodash'
import Text, { Black, Regular } from './style/typography'
import LoadingScreen from './LoadingScreen'
import { AdMobBanner } from 'react-native-admob'
import SingleCardSwipe from './helpers/SingleCardSwipe'
import SwipeInstructionGraphic from './SwipeInstructionGraphic'
import { Footer, SwipeWrapper as ViewWrapper } from './style/content'

const newspaperBg = require('./img/intro-bg.jpg')

const adUnitId = Platform.select({
  ios: 'ca-app-pub-7905807201378145/6576693799',
  android: 'ca-app-pub-7905807201378145/1511562192'
})

const testDeviceId = !__DEV__ ? null : Platform.select({
  ios: 'EMULATOR',
  android: '677F73582515E3A533EE4E98B94BAE8B'
})

const ArticleImage = styled(Image)`
  width: ${({ width }) => width };
  height: ${({ height }) => height + 20 };
  position: absolute;
  top: -10;
  left: ${({ width }) => width / 2 };
  justify-content: center;
  align-items: center;
  opacity: 0.35;
  transform: translateX(-${({ width }) => width / 2 });
`

const ResultsWrapper = styled.View`
  flex-grow: 1;
  width: ${({ width }) => width };
  height: ${({ height }) => height };
  background-color: transparent;
  padding-top: 50;
`

const Ad = styled(AdMobBanner)`
  flex-grow: 0;
  height: 50;
`

const ResultHeading = styled(Regular)`
  color: #ccc;
  font-size: 24;
  text-align: center;
  margin: 0 20 10;
`

const ResultWord = styled(Black)`
  font-size: 100;
  line-height: 125;
  color: white;
  text-align-vertical: center;
  text-align: center;
  margin: ${ Platform.OS === 'ios' ? '0 20 5' : '0 20 25' };
`

const JudgmentWord = styled(Black)`
  font-size: 32;
  text-align: center;
  color: #ccc;
  margin: 10 20 20;
`

const ContentWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`

@inject('state')
@observer
class ResultView extends Component {

  @observable showAd = false

  @action setAdDisplay = (display = false) => {
    this.showAd = display
  }

  render() {
    const { width, height } = Dimensions.get('window')
    const { judgedNews } = this.props.state

    const judgedArticle = _.last(judgedNews.slice())
    const { judgment: yourJudgment, truePercentage: percent, judgmentCount: responses, image } = judgedArticle

    const displayPercentage = yourJudgment === true ? percent : 100 - percent
    const displayWord = yourJudgment === true ? 'REAL' : 'FAKE'

    const imageSource = image ? { uri: image } : newspaperBg

    return (
      <ViewWrapper width={ width }>
        <SingleCardSwipe
          rightText="NEXT!"
          leftText="NEXT!"
          onRight={ () => this.props.onDone(judgedArticle) }
          onLeft={ () => this.props.onDone(judgedArticle) }>
          <ArticleImage
            width={ width }
            height={ height }
            resizeMode="cover"
            source={ imageSource } />
          <ResultsWrapper width={ width } height={ this.showAd ? height - 50 : height }>
            { percent === false ? (
              <LoadingScreen
                loadingText="Loading results..."
                bg="transparent" />
            ) : (
              <ContentWrapper>
                { displayPercentage === 0 && responses > 0 ? (
                  <View>
                    <ResultHeading>
                      You're the first to judge this article
                    </ResultHeading>
                    <ResultWord>
                      { displayWord }
                    </ResultWord>
                  </View>
                ) : responses === 0 ? (
                  <View>
                    <ResultHeading>
                      You judged this article
                    </ResultHeading>
                    <ResultWord>
                      { displayWord }
                    </ResultWord>
                  </View>
                ) : (
                  <View>
                    <ResultHeading>
                      You agree with
                    </ResultHeading>
                    <ResultWord>
                      { displayPercentage }%
                    </ResultWord>
                    <ResultHeading>
                      others that this article is <JudgmentWord>{ displayWord }!</JudgmentWord>
                    </ResultHeading>
                  </View>
                )}
              </ContentWrapper>
            )}
            <Footer>
              <SwipeInstructionGraphic />
            </Footer>
          </ResultsWrapper>
        </SingleCardSwipe>
        { this.showAd ? (
            <Ad
              bannerSize="smartBannerPortrait"
              adUnitID={ adUnitId }
              testDeviceID={ testDeviceId }
              didFailToReceiveAdWithError={ err => this.setAdDisplay(false) } />
          ) : null }
      </ViewWrapper>
    )
  }
}

export default ResultView
