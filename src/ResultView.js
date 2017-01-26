import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import _ from 'lodash'
import Text from 'react-native-text'
import LoadingScreen from './LoadingScreen'
import Button from 'apsl-react-native-button'

const ResultsWrapper = styled.View`
  flex-grow: 1;
  align-self: stretch;
  align-items: stretch;
  justify-content: center;
  background-color: black;
`

const ResultHeading = styled(Text)`
  color: white;
  font-size: 20;
  font-weight: 300;
  text-align: center;
`

const ResultWord = styled(ResultHeading)`
  font-size: 36;
  font-weight: 700;
`

const ContinueButton = styled(Button)`
  background-color: white;
  margin: 80 50 0;
`

const ButtonLabel = styled(Text)`
  font-size: 16;
`

@inject('state')
@observer
class ResultView extends Component {

  render() {
    const { judgedNews } = this.props.state

    const judgedArticle = _.last(judgedNews.slice())
    const yourResponse = judgedArticle.judgment
    const percent = judgedArticle.truePercentage

    const displayPercentage = yourResponse === true ? percent : 100 - percent
    const displayWord = yourResponse === true ? 'REAL!' : 'FAKE!'

    return percent === false ? (
        <LoadingScreen
          loadingText="Loading results..."
          bg="black" />
    ) : (
      <ResultsWrapper>
        <ResultHeading>
          You{ displayPercentage > 0 ? ` and ${ displayPercentage }% others` : '' } rated it as
        </ResultHeading>
        <ResultWord>
          { displayWord }
        </ResultWord>
        <ContinueButton
          onPress={ () => this.props.onDone(judgedArticle) }>
          <ButtonLabel>
            { 'Ok, next!'.toUpperCase() }
          </ButtonLabel>
        </ContinueButton>
      </ResultsWrapper>
    )
  }
}

export default ResultView
