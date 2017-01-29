import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, StatusBar, Modal } from 'react-native'
import { computed, action, observable, reaction } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import SwipeCards from '../helpers/SwipeCards'
import NewsItem from '../NewsItem'
import StackEnd from '../StackEnd'
import ResultView from '../ResultView'
import newsActions from '../actions/newsActions'
import reddit from '../api/reddit'
import layoutAnim from '../helpers/layoutAnim'
import _ from 'lodash'
import LoadingScreen from '../LoadingScreen'
import ArticleView from '../ArticleView'
import SwipeGraphics from '../SwipeGraphics'

const Wrapper = styled.View`
  align-items: stretch;
  flex-grow: 1;
  background-color: black;
  position: relative;
  z-index: 100;
`

@inject('state')
@observer
class JudgmentView extends Component {

  @observable articleUrl = false
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

  @action openArticle = url => {
    this.articleUrl = url
  }

  @action closeArticle = () => {
    this.articleUrl = false
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
      <Wrapper style={ StyleSheet.absoluteFill }>
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
          <SwipeCards
            allowGestureTermination={ false }
            onCardDone={ this.onCardDone }
            stackOffsetX={ 0 }
            showYup
            showNope
            handleYup={ item => this.newsActions.judgeItem(true, item) }
            handleNope={ item => this.newsActions.judgeItem(false, item) }
            renderYup={ styles => <SwipeGraphics style={ styles } label="REAL!" side="right" /> }
            renderNope={ styles => <SwipeGraphics style={ styles } label="FAKE!" side="left" /> }
            renderNoMoreCards={ () => <StackEnd /> }
            renderCard={ cardData => (
              <NewsItem
                onOpenArticle={ this.openArticle }
                key={ cardData.id }
                { ...cardData } />
            )}
            cards={ unjudgedNews } />
        )}
        <Modal
          transparent
          visible={ !!this.articleUrl }
          animationType="slide"
          key="article-modal">
          <ArticleView
            closeArticle={ this.closeArticle }
            url={ this.articleUrl } />
        </Modal>
      </Wrapper>
    )
  }
}

export default JudgmentView