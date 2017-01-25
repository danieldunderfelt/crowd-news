import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, StatusBar } from 'react-native'
import { computed, action, observable, reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import SwipeCards from './helpers/SwipeCards'
import NewsItem from './NewsItem'
import StackEnd from './StackEnd'
import ResultView from './ResultView'
import newsActions from './actions/newsActions'
import reddit from './api/reddit'
import layoutAnim from './helpers/layoutAnim'

const Wrapper = styled.View`
  align-items: stretch;
  flex-grow: 1;
  background-color: black;
  position: relative;
`

@inject('state')
@observer
class JudgmentView extends Component {

  @observable showResults = false
  newsActions = (newsActions(this.props.state))

  componentDidMount() {
    reddit(this.props.state)
      .getPosts()
      .then(this.newsActions.addItems)
  }

  @action onCardDone = next => {
    LayoutAnimation.configureNext(layoutAnim)
    this.showResults = true

    reaction(() => !this.showResults , doNextCard => {
      if(doNextCard) next()
    })
  }

  @action onResultsDone = () => {
    LayoutAnimation.configureNext(layoutAnim)
    this.showResults = false
  }

  render() {
    const { unjudgedNews } = this.props.state

    return (
      <Wrapper>
        <StatusBar
          translucent
          showHideTransition="fade"
          barStyle="light-content" />
        { this.showResults ? (
          <ResultView
            onDone={ this.onResultsDone } />
        ) : (
          <SwipeCards
            onCardDone={ this.onCardDone }
            stackOffsetX={ 0 }
            showYup
            showNope
            yupText="Real!"
            noText="Fake!"
            handleYup={ item => this.newsActions.judgeItem(true, item) }
            handleNope={ item => this.newsActions.judgeItem(false, item) }
            renderNoMoreCards={ () => <StackEnd /> }
            renderCard={ cardData => <NewsItem { ...cardData } /> }
            cards={ unjudgedNews } />
        )}
      </Wrapper>
    )
  }
}

export default JudgmentView
