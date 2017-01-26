import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, StatusBar, Modal } from 'react-native'
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
import _ from 'lodash'
import LoadingScreen from './LoadingScreen'
import ArticleView from './ArticleView'

const Wrapper = styled.View`
  align-items: stretch;
  flex-grow: 1;
  background-color: black;
  position: relative;
`

@inject('state')
@observer
class JudgmentView extends Component {

  @observable articleUrl = false
  @observable showResults = false
  newsActions = (newsActions(this.props.state))

  componentDidMount() {
    reddit(this.props.state)
      .getPosts()
      .then(this.newsActions.addItems)
  }

  @action openArticle = url => {
    this.articleUrl = url
  }

  @action closeArticle = () => {
    this.articleUrl = false
  }

  @action onCardDone = next => {
    LayoutAnimation.configureNext(layoutAnim)
    this.showResults = true

    reaction(() => !this.showResults , doNextCard => {
      if(doNextCard) next()
    })
  }

  @action onResultsDone = item => {
    LayoutAnimation.configureNext(layoutAnim)

    this.newsActions.saveJudgment(item)
    this.showResults = false
  }

  render() {
    const { unjudgedNews, judgedNews } = this.props.state

    return (
      <Wrapper>
        <StatusBar
          translucent
          showHideTransition="fade"
          barStyle="light-content" />
        { unjudgedNews.length === 0 ? (
          <LoadingScreen loadingText="Loading news..." />
        ) : this.showResults ? (
          <ResultView
            key={ `results_${_.last(judgedNews.slice()).id}` }
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
            renderCard={ cardData => (
              <NewsItem
                onOpenArticle={ this.openArticle }
                key={ cardData.id } { ...cardData } />
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
