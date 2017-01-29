import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'

@observer
class LoginScreen extends Component {

  componentDidMount() {
    setTimeout(this.props.navigation.state.params.onLoggedIn, 2000)
  }

  render() {

    return (
      <View>
        <Text>
          Login
        </Text>
      </View>
    )
  }
}

export default LoginScreen
