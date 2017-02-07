import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Text from 'react-native-text'

const TextStyle = Platform.select({
  ios: styled(Text)`
    font-family: Raleway;
    font-weight: 400;
  `,
  android: styled(Text)`
    font-family: Raleway-Regular;
  `
})

export default TextStyle

export const Black = Platform.select({
  ios: styled(TextStyle)`
    font-weight: 900;
  `,
  android: styled(Text)`
    font-family: Raleway-Black;
  `
})

export const Bold = Platform.select({
  ios: styled(TextStyle)`
    font-weight: 700;
  `,
  android: styled(Text)`
    font-family: Raleway-Bold;
  `
})

export const Regular = Platform.select({
  ios: styled(TextStyle)`
    font-weight: 400;
  `,
  android: styled(Text)`
    font-family: Raleway-Regular;
  `
})
