import styled from 'styled-components/native'
import Text from 'react-native-text'

export const ViewHeading = styled(Text)`
  font-size: ${({ size = 90 }) => size };
  font-weight: 900;
  margin: 30 0;
  color: white;
  line-height: ${({ size = 90 }) => size + 10 };
  background-color: transparent;
`

export const Paragraph = styled(Text)`
  font-size: 16;
  color: white;
  line-height: 25;
`

export const Bold = styled(Text)`
  font-weight: 700;
  font-size: 16;
`
