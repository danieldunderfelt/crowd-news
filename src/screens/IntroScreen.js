import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import styled from 'styled-components/native'
import Button, { ButtonLabel } from '../Button'
import Screen from '../style/Screen'

@inject('state')
@observer
class IntroScreen extends Component {

  render() {
    const { navigation, state } = this.props

    return (
      <Screen bg="white" padding={ 20 }>
        <StatusBar
          translucent
          showHideTransition="fade"
          barStyle="dark-content" />
        <Text>
          Introscreen
        </Text>
        <Button onPress={ () => navigation.navigate('Judge') }>
          <ButtonLabel color="white">
            Start
          </ButtonLabel>
        </Button>
        { !state.user ? (
          <Button onPress={ () => navigation.navigate('Login') }>
            <ButtonLabel color="white">
              Login
            </ButtonLabel>
          </Button>
        ) : null }
      </Screen>
    )
  }
}

export default IntroScreen
