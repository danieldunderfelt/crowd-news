import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
import { observer } from 'mobx-react/native'
import { computed, action, observable, reaction } from 'mobx'
import { SwipeWrapper } from './style/content'
import SwipeCards from './helpers/SwipeCards'
import SwipeGraphics from './SwipeGraphics'
import NewsItem from './NewsItem'
import ArticleView from './ArticleView'

@observer
class ArticleSwipe extends Component {

  @observable articleUrl = false

  @action openArticle = url => {
    this.articleUrl = url
  }

  @action closeArticle = () => {
    this.articleUrl = false
  }

  render() {
    const { onLeft, onRight, cards, onCardDone } = this.props

    return (
      <SwipeWrapper>
        <SwipeCards
          allowGestureTermination={ false }
          onCardDone={ onCardDone }
          stackOffsetX={ 0 }
          showYup
          showNope
          handleYup={ onRight }
          handleNope={ onLeft }
          renderYup={ styles => <SwipeGraphics style={ styles } color="black" label="REAL!" side="right" /> }
          renderNope={ styles => <SwipeGraphics style={ styles } color="white" label="FAKE!" side="left" /> }
          renderCard={ cardData => (
            <NewsItem
              onOpenArticle={ this.openArticle }
              key={ cardData.id }
              { ...cardData } />
          )}
          cards={ cards } />
        <Modal
          transparent
          visible={ !!this.articleUrl }
          animationType="slide"
          key="article-modal">
          <ArticleView
            closeArticle={ this.closeArticle }
            url={ this.articleUrl } />
        </Modal>
      </SwipeWrapper>
    )
  }
}

export default ArticleSwipe
