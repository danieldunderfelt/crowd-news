import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { observable, action } from 'mobx'
import styled from 'styled-components/native'
import _ from 'lodash'
import Text from 'react-native-text'
import LoadingScreen from './LoadingScreen'
import { AdMobBanner } from 'react-native-admob'
import SingleCardSwipe from './helpers/SingleCardSwipe'

const newspaperBg = require('./img/intro-bg.jpg')

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
  height: ${({ height }) => height };
  background-color: transparent;
`

const ViewWrapper = styled.View`
  flex-grow: 1;
  align-self: stretch;
  justify-content: center;
  position: relative;
`

const Ad = styled(AdMobBanner)`
  flex-grow: 1;
  height: 50;
`

const ResultHeading = styled(Text)`
  color: #ededed;
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
  margin: 20 0;
`

const ContentWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

@inject('state')
@observer
class ResultView extends Component {

  @observable showAd = true

  render() {
    const { width, height } = Dimensions.get('window')
    const { judgedNews } = this.props.state

    const judgedArticle = _.last(judgedNews.slice())
    const { judgment: yourJudgment, truePercentage: percent, judgmentCount: responses, image } = judgedArticle

    const displayPercentage = yourJudgment === true ? percent : 100 - percent
    const displayWord = yourJudgment === true ? 'REAL' : 'FAKE'

    const imageSource = image ? { uri: image } : newspaperBg

    return (
      <ViewWrapper>
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
          <ResultsWrapper height={ this.showAd ? height - 50 : height }>
            <JudgedHeading>
              { judgedArticle.title }
            </JudgedHeading>
            { percent === false ? (
              <LoadingScreen
                loadingText="Loading results..."
                bg="transparent" />
            ) : (
              <View>
                { displayPercentage === 0 && responses > 0 ? (
                  <ContentWrapper>
                    <ResultHeading>
                      You're the first one to rate this article
                    </ResultHeading>
                    <ResultWord>
                      { displayWord }
                    </ResultWord>
                  </ContentWrapper>
                ) : responses === 0 ? (
                  <ContentWrapper>
                    <ResultHeading>
                      You're the first one to rate this article!
                    </ResultHeading>
                  </ContentWrapper>
                ) : (
                  <ContentWrapper>
                    <ResultHeading>
                      You agree with
                    </ResultHeading>
                    <ResultWord>
                      { displayPercentage }%
                    </ResultWord>
                    <ResultHeading>
                      others that this article is <JudgmentWord>{ displayWord }!</JudgmentWord>
                    </ResultHeading>
                  </ContentWrapper>
                )}
              </View>
            )}
          </ResultsWrapper>
          { this.showAd ? (
            <Ad
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-7905807201378145/6576693799"
              testDeviceID={ __DEV__ ? "EMULATOR" : false }
              didFailToReceiveAdWithError={ action(() => this.showAd = false ) } />
          ) : null }
        </SingleCardSwipe>
      </ViewWrapper>
    )
  }
}

export default ResultView
