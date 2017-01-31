import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, StatusBar, Modal } from 'react-native'
import { computed, action, observable, reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import ResultView from '../ResultView'
import newsActions from '../actions/newsActions'
import reddit from '../api/reddit'
import layoutAnim from '../helpers/layoutAnim'
import _ from 'lodash'
import LoadingScreen from '../LoadingScreen'
import ArticleSwipe from '../ArticleSwipe'

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

  newsActions = (newsActions(this.props.state, this.props.navigation))
  reddit = (reddit(this.props.state))

  componentDidMount() {
    const { state, navigation } = this.props

    reaction(() => state.unjudgedNews.length, stackLength => {
      if(!stackLength) this.fillStack()
    })

    this.newsActions
      .hydrateJudged()
      .then(this.fillStack)
  }

  fillStack = () => {
    return this.reddit
      .getPosts()
      .then(this.newsActions.addItems)
  }

  @action onCardDone = (next) => {
    LayoutAnimation.configureNext(layoutAnim)
    this.showResults = true

    reaction(() => !this.showResults, doNextCard => {
      if(doNextCard) next()
    })
  }

  @action onResultsDone = item => {
    LayoutAnimation.configureNext(layoutAnim)
    this.showResults = false
  }

  render() {
    const { state } = this.props
    const { unjudgedNews, judgedNews } = state

    return (
      <Wrapper>
        <StatusBar
          translucent
          showHideTransition="fade"
          barStyle="light-content" />
        { this.showResults ? (
          <ResultView
            key={ `results_${_.last(judgedNews.slice()).id}` }
            onDone={ this.onResultsDone } />
        ) : unjudgedNews.length === 0 ? (
          <LoadingScreen loadingText="Loading news..." />
        ) : (
          <ArticleSwipe
            onLeft={ item => this.newsActions.judgeItem(false, item) }
            onRight={ item => this.newsActions.judgeItem(true, item) }
            onCardDone={ this.onCardDone }
            cards={ unjudgedNews } />
        )}
      </Wrapper>
    )
  }
}

export default JudgmentView
