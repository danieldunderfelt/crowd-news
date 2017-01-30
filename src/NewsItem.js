import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from './Button'
import Text from 'react-native-text'
import { observable, action } from 'mobx'

const newspaperBg = require('./img/intro-bg.jpg')

const Wrapper = styled.View`
  flex-grow: 1;
  padding: 0;
  justify-content: center;
  align-items: stretch;
  background-color: black;
  position: relative;
`

const Title = styled(Text)`
  font-size: 24;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20;
  color: white;
`

const ArticleImage = styled(Image)`
  width: ${({ width }) => width };
  height: ${({ height }) => height + 20 };
  position: absolute;
  top: -10;
  left: ${({ width }) => width / 2 };
  justify-content: center;
  align-items: center;
  opacity: 0.35;
  transform: translateX(-${({ width }) => width / 2 });
`

const ArticleContent = styled.View`
  width: ${({ width }) => width };
  background-color: transparent;
  align-items: center;
  justify-content: center;
  padding: 40;
  flex-grow: 1;
  align-self: stretch;
`

const ReadButton = styled(Button)`
  background-color: black;
  margin: 70 50 0;
`

const ReadButtonLabel = styled(ButtonLabel)`
  color: white;
`

@observer
class NewsItem extends Component {

  render() {
    const { title, url, image, onOpenArticle } = this.props
    const { width, height } = Dimensions.get('window')

    const imageSource = image ? { uri: image } : newspaperBg

    return (
      <Wrapper>
        { image && (
          <ArticleImage
            width={ width }
            height={ height }
            resizeMode="cover"
            source={ imageSource }/>
        )}
        <ArticleContent width={ width }>
          <Title>
            { title }
          </Title>
          <ReadButton onPress={ () => onOpenArticle(url) }>
            <ReadButtonLabel>
              Read article
            </ReadButtonLabel>
          </ReadButton>
        </ArticleContent>
      </Wrapper>
    )
  }
}

export default NewsItem
