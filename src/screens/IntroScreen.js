import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button from '../Button'

@observer
class IntroScreen extends Component {

  static navigationOptions = {
    header: { visible: false }
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View>
        <Text>
          Introscreen
        </Text>
        <Button onPress={ () => navigate('Judge') }>
          Start
        </Button>
      </View>
    )
  }
}

export default IntroScreen
