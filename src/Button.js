import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button from 'apsl-react-native-button'
import Text from 'react-native-text'

const StyledButton = styled(Button)`
  border-radius: 0;
  border: 0;
  background-color: ${({ color = 'black' }) => color };
`

export const ButtonLabel = styled(Text)`
  font-size: 14;
  font-weight: 700;
  color: ${({ color = 'white' }) => color };
`

export default observer(props => {

  return (
    <StyledButton { ...props } />
  )
})
