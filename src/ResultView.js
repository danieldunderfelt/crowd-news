import React, { Component, PropTypes } from 'react'
import { Button } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import _ from 'lodash'
import Text from 'react-native-text'
import LoadingScreen from './LoadingScreen'

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
        <Button
          title="Ok, next!"
          onPress={ () => this.props.onDone(judgedArticle) } />
      </ResultsWrapper>
    )
  }
}

export default ResultView
