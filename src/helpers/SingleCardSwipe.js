import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import SwipeCards from './SwipeCards'
import { SwipeWrapper } from '../style/content'
import SwipeGraphics from '../SwipeGraphics'

const style = StyleSheet.create({
  textStyle: {
    fontSize: 40,
    fontWeight: '700',
  }
})

@observer
class SingleCardSwipe extends Component {

  render() {
    const { onLeft, onRight, leftText, rightText, children } = this.props

    return (
      <SwipeWrapper>
        <SwipeCards
          cards={[ 1 ]}
          stackOffsetX={ 0 }
          showYup
          showNope
          renderCard={ () => (
            <View style={{ flexGrow: 1, alignItems: 'stretch' }}>
              { children }
            </View>
          )}
          handleYup={ onRight }
          handleNope={ onLeft }
          renderYup={ styles => (
            <SwipeGraphics textStyle={ style.textStyle } color="black" style={ styles } label={ rightText } side="right" />
          )}
          renderNope={ styles => (
            <SwipeGraphics textStyle={ style.textStyle } color="white" style={ styles } label={ leftText } side="left" />
          )}
          allowGestureTermination={ false } />
      </SwipeWrapper>
    )
  }
}

export default SingleCardSwipe
