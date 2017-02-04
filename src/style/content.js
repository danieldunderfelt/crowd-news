import { Dimensions} from 'react-native'
import styled from 'styled-components/native'

const initialWidth = () => Dimensions.get('window').width

export const ContentBox = styled.View`
  padding: 20;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Footer = styled.View`
  flex-grow: 1;
  justify-content: flex-end;
`

export const SwipeWrapper = styled.View`
  align-items: stretch;
  flex-grow: 1;
  background-color: black;
  justify-content: center;
  position: relative;
  width: ${({ width = initialWidth() }) => width };
`
