import React, { Component, PropTypes } from 'react'
import { StackNavigator } from 'react-navigation'
import IntroScreen from './screens/IntroScreen'
import JudgmentScreen from './screens/JudgmentScreen'
import LoginScreen from './screens/LoginScreen'

export default StackNavigator({
  Home: { screen: IntroScreen },
  Judge: { screen: JudgmentScreen },
  Login: { screen: LoginScreen, mode: 'modal' }
}, {
  headerMode: 'none'
})
