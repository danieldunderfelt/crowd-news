import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import BgImage from '../style/BackgroundImageScreen'
import storage from '../helpers/storage'
import { ViewHeading, Paragraph, Bold } from '../style/typography'
import { ContentBox, Footer } from '../style/content'

const FloatingButton = styled(Button)`
  position: absolute;
  top: 20;
  right: 7;
  flex-grow: 1;
  height: 20;
  background-color: transparent;
`

const FloatingLabel = styled(ButtonLabel)`
  color: white;
  font-size: 10;
`

@inject('state', 'auth')
@observer
class IntroScreen extends Component {

  render() {
    const { navigation, auth } = this.props

    return (
      <BgImage image={ require('../img/intro-bg.jpg') }>
        <ViewHeading>
          Fake News?!
        </ViewHeading>
        <ContentBox>
          <Paragraph>
            "Fake News" are news articles that are either completely false, based on half-truths
            or exhibit an overt bias. They're compelling to click on and can be shocking to read.
            Activate your critical thinking and find out how well you can <Bold>spot Fake News!</Bold>
          </Paragraph>
        </ContentBox>
        <Footer>
          <Button onPress={ () => navigation.navigate('Judge') }>
            <ButtonLabel color="white">
              Start
            </ButtonLabel>
          </Button>
          { __DEV__ ? (
            <View>
              <Button onPress={ () => navigation.navigate('Login') }>
                <ButtonLabel color="white">
                  Login
                </ButtonLabel>
              </Button>
              <Button onPress={ () => storage.removeItem('rated-news') }>
                <ButtonLabel color="white">
                  Clear cache
                </ButtonLabel>
              </Button>
            </View>
          ) : null }
        </Footer>
        <FloatingButton
          small
          onPress={ () => auth.logOut() }>
          <FloatingLabel>
            Log out?
          </FloatingLabel>
        </FloatingButton>
      </BgImage>
    )
  }
}

export default IntroScreen
