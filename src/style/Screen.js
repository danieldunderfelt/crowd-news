import styled from 'styled-components/native'

export default styled.View`
  background-color: ${({ bg }) => bg };
  flex-grow: 1;
  padding: ${({ padding = 0 }) => padding };
  ${({ height = false }) => height ? `height: ${ height };` : '' }
`
