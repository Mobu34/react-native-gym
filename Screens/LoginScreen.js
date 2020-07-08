// Components/Login.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { requestLogin } from '../Data/DataFromServer'

class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  _login() {
    const { username, password } = this.state
    if (username !== '' && password !== '') {
      console.log(username)
      console.log(password)
      requestLogin(username, password).then(data => {
        if (data.length > 0) {
          if (data[0].username === username && data[0].password === password) {
            this.props.navigation.navigate("TabNavigator")
          }
        }
      })
    }
  }

  _createAccount() {
    console.log("CREATE AN ACCOUNT")
    this.props.navigation.navigate("SignUpScreenStackNavigator")
  }

  render() {
    const { username, password } = this.state
    return (
      <View style={styles.main_container}>
        <Input
          placeholder='Username'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          inputStyle={styles.input_style}
          onChangeText={(text) => this.setState({ username: text })}
          value={username}
        />
        <Input
          placeholder='Password'
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
          inputStyle={styles.input_style}
          onChangeText={(text) => this.setState({ password: text })}
          value={password}
        />
        <Button
          title='Login'
          onPress={() => this._login()}
        />
        <Button
          title='Create an account'
          type='clear'
          onPress={() => this._createAccount()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_style: {
    marginLeft: 10
  }
})

export default LoginScreen
