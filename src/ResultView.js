import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import _ from 'lodash'

const ResultsWrapper = styled.View`
  flex-grow: 1;
  align-self: stretch;
  align-items: stretch;
  justify-content: center;
  background-color: black;
`

const ResultsHeading = styled.Text`
  color: white;
  font-size: 28;
  font-weight: 700;
  text-align: center;
`

@inject('state')
@observer
class ResultView extends Component {

  render() {
    const { judgedNews } = this.props.state
    const judgementItem = _.last(judgedNews.slice())
    const yourResponse = _.get(judgementItem, 'judgement')
    const truePercentage = _.get(judgementItem, 'truePercentage', 0)

    const displayPercentage = yourResponse === true ? truePercentage : (100 - truePercentage)
    const displayWord = yourResponse === true ? 'REAL!' : 'FAKE!!!'

    return (
      <ResultsWrapper>
        <ResultsHeading>
          You and { displayPercentage }% others said { displayWord }
        </ResultsHeading>
        <Button
          title="Ok, next!"
          onPress={ this.props.onDone } />
      </ResultsWrapper>
    )
  }
}

export default ResultView
