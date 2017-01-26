import React, { Component, PropTypes } from 'react'
import { View, WebView, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button from 'apsl-react-native-button'

const ArticleWrapper = styled.View`
  flex: 1;
  background-color: transparent;
  margin: 22 6 0 7;
  overflow: hidden;
  border-radius: 5;
`

const CloseButton = styled(Button)`
  background-color: #cccccc;
  border-radius: 5;
  border-width: 0;
  border-top-width: ${ StyleSheet.hairlineWidth };
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`

const Web = styled(WebView)``

@observer
class ArticleView extends Component {

  render() {
    const { url, closeArticle } = this.props

    return (
      <ArticleWrapper>
        <Web source={{ uri: url }} />
        <CloseButton onPress={ closeArticle }>
          Close
        </CloseButton>
      </ArticleWrapper>
    )
  }
}

export default ArticleView
