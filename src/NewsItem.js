import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  flex-grow: 1;
  padding: 0;
  justify-content: center;
  align-items: stretch;
  background-color: black;
  position: relative;
`

const Title = styled.Text`
  font-size: 24;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20;
  color: white;
`

const Url = styled.Text`
  font-size: 16;
  text-align: center;
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
  padding: 20;
  flex-grow: 1;
  align-self: stretch;
`

export default observer(props => {
  const { title, url, image, truePercentage } = props
  const { width, height } = Dimensions.get('window')

  return (
    <Wrapper>
      { image && (
        <ArticleImage
          width={ width }
          height={ height }
          resizeMode="cover"
          source={{ uri: image }} />
      )}
      <ArticleContent
        width={ width }>
        <Title>
          { title }
        </Title>
      </ArticleContent>
    </Wrapper>
  )
})
