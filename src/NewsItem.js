import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  padding: 20;
  border-width: ${ StyleSheet.hairlineWidth };
  border-radius: 5;
  border-color: black;
  background: #6699dd;
`

const Title = styled.Text`
  font-size: 30;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20;
`

const Url = styled.Text`
  font-size: 16;
  text-align: center;
`

export default observer(props => {
  const { title, url } = props

  return (
    <Wrapper>
      <Title>
        { title }
      </Title>
      <Url>
        { url }
      </Url>
    </Wrapper>
  )
})
