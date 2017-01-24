import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { computed, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import SwipeCards from './helpers/SwipeCards'
import NewsItem from './NewsItem'
import StackEnd from './StackEnd'
import newsActions from './actions/newsActions'
import reddit from './api/reddit'

const Wrapper = styled.View`
  align-items: stretch;
  flex-grow: 1;
  background-color: black;
  position: relative;
`

@inject('state')
@observer
class JudgmentView extends Component {

  newsActions = (newsActions(this.props.state))

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
    const { unjudgedNews } = this.props.state

    return (
      <Wrapper>
        <SwipeCards
          stackOffsetX={ 0 }
          showYup
          showNope
          yupText="Real!"
          noText="Fake!"
          handleYup={ this.onYup }
          handleNope={ this.onNope }
          renderNoMoreCards={ () => <StackEnd /> }
          renderCard={ cardData => <NewsItem { ...cardData } /> }
          cards={ unjudgedNews } />
      </Wrapper>
    )
  }
}

export default JudgmentView
