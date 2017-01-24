import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  width: 300;
  height: 300;
`

const Title = styled.Text`
  font-size: 30;
  font-weight: 700;
  color: white;
  text-align: center;
`

export default observer(props => {

  return (
    <Wrapper>
      <Title>
        No more cards!
      </Title>
    </Wrapper>
  )
})
