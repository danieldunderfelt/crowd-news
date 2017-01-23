import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { computed, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import SwipeCards from 'react-native-swipe-cards'
import NewsItem from './NewsItem'
import StackEnd from './StackEnd'
import newsActions from './actions/newsActions'
import _ from 'lodash'
import reddit from './api/reddit'

const Wrapper = styled.View`
  padding-vertical: 25;
  padding-horizontal: 15;
  justify-content: center;
  flex-grow: 1;
  background-color: transparent;
`

@inject('state')
@observer
class JudgmentView extends Component {

  newsActions = (newsActions(this.props.state))

  @computed get news() {
    const { state } = this.props

    return _.chain(state.news.slice())
      .filter(newsItem => {
        return state.judgedNews.findIndex(i => i.id === newsItem.id ) === -1
      })
      .value()
  }

  componentDidMount() {
    reddit(this.props.state)
      .getPosts()
      .then(this.newsActions.addItems)
  }

  @action onYup = newsItem => {
    this.props.state.judgedNews.push({
      id: newsItem.id,
      judgment: true
    })
  }

  @action onNope = newsItem => {
    this.props.state.judgedNews.push({
      id: newsItem.id,
      judgment: false
    })
  }

  render() {

    return (
      <Wrapper>
        <SwipeCards
          containerStyle={ style.containerStyle }
          showYup
          showNope
          yupText="Real!"
          noText="Fake!"
          handleYup={ this.onYup }
          handleNope={ this.onNope }
          renderNoMoreCards={ () => <StackEnd /> }
          renderCard={ cardData => <NewsItem { ...cardData } /> }
          cards={ this.news } />
      </Wrapper>
    )
  }
}

export default JudgmentView

const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
