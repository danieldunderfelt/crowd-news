import React, { Component, PropTypes } from 'react'
import { View, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import BgImage from '../style/BackgroundImageScreen'
import storage from '../helpers/storage'
import { ViewHeading, Paragraph, Bold } from '../style/typography'
import { SwipeWrapper, ContentBox, Footer } from '../style/content'
import SingleCardSwipe from '../helpers/SingleCardSwipe'
import SwipeInstructionGraphic from '../SwipeInstructionGraphic'

const FloatingButton = styled(Button)`
  position: absolute;
  top: 30;
  right: 8;
  flex-grow: 1;
  height: 20;
  background-color: transparent;
`

const FloatingLabel = styled(ButtonLabel)`
  color: white;
  font-size: 10;
`

const AppHeading = styled(ViewHeading)`
  font-size: 100;
  line-height: 110;
  text-align: center;
`

@inject('state', 'auth')
@observer
class IntroScreen extends Component {

  render() {
    const { width } = Dimensions.get('window')
    const { navigation, auth, state } = this.props

    return (
      <SwipeWrapper width={ width } >
        <SingleCardSwipe
          rightText="START!"
          leftText={ __DEV__ ? 'Login' : "START!" }
          onRight={ () => navigation.navigate('Judge') }
          onLeft={ () => navigation.navigate(__DEV__ ? 'Login' : 'Judge') }>
          <BgImage image={ require('../img/intro-bg.jpg') }>
            <AppHeading>
              Media Match
            </AppHeading>
            <ContentBox>
              <Paragraph>
                "Fake News" are news articles that are either completely false, based on half-truths
                or exhibit an overt bias. They're compelling to click on and can be shocking to read.
                Activate your critical thinking and find out how well you can <Bold>spot Fake News!</Bold>
              </Paragraph>
            </ContentBox>
            <Footer>
              <SwipeInstructionGraphic />
              { __DEV__ ? (
                  <View>
                    <Button onPress={ () => storage.removeItem('rated-news') }>
                      <ButtonLabel color="white">
                        Clear cache
                      </ButtonLabel>
                    </Button>
                  </View>
                ) : null }
            </Footer>
          </BgImage>
        </SingleCardSwipe>
        { state.user ? (
            <FloatingButton
              small
              onPress={ () => auth.logOut() }>
              <FloatingLabel>
                Log out?
              </FloatingLabel>
            </FloatingButton>
          ) : null }
      </SwipeWrapper>
    )
  }
}

export default IntroScreen
