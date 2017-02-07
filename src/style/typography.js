import styled from 'styled-components/native'
import Text from 'react-native-text'

const TextStyle = styled(Text)`
  font-family: Raleway;
`

export default TextStyle

export const ViewHeading = styled(TextStyle)`
  font-size: ${({ size = 90 }) => size };
  font-weight: 900;
  margin: 30 0;
  color: white;
  line-height: ${({ size = 90 }) => size + 10 };
  background-color: transparent;
`

export const Paragraph = styled(TextStyle)`
  font-size: 16;
  color: white;
  line-height: 25;
`

export const Bold = styled(TextStyle)`
  font-weight: 700;
  font-size: 16;
`
