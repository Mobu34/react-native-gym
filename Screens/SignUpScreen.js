// Components/CreateAccount.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { requestIfUsernameIsExisting, requestIfEmailIsExisting, requestNewAccount } from '../Data/DataFromServer'

class CreateAccount extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confPassword: '',
      usernameErrorMessage: '',
      emailErrorMessage: '',
      passwordInputColor: '#000',
      passwordErrorMessage: '',
    }
  }

  _requestUsername() {
    const { username, usernameErrorMessage } = this.state
    if (username !== '') {
      console.log("REQUEST")
      requestIfUsernameIsExisting(username).then(data => {
        if (data.length > 0 && usernameErrorMessage === '') {
          this.setState({
            usernameErrorMessage: 'This username already exists'
          })
        }
        else if (data.length === 0 && usernameErrorMessage !== '') {
          this.setState({
            usernameErrorMessage: ''
          })
        }
      })
    }
    else if (username === '' && usernameErrorMessage !== '') {
      this.setState({
        usernameErrorMessage: ''
      })
    }
  }

  _requestEmail() {
    const { email, emailErrorMessage } = this.state
    if (email !== '') {
      console.log("REQUEST")
      requestIfEmailIsExisting(email).then(data => {
        if (data.length > 0 && emailErrorMessage === '') {
          this.setState({
            emailErrorMessage: 'This email already exists'
          })
        }
        else if (data.length === 0 && emailErrorMessage !== '') {
          this.setState({
            emailErrorMessage: ''
          })
        }
      })
    }
    else if (email === '' && emailErrorMessage !== '') {
      this.setState({
        emailErrorMessage: ''
      })
    }
  }

  _createAccount() {
    const { username, email, password, confPassword, usernameErrorMessage, emailErrorMessage } = this.state
    const regex = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (username !== '' && email !== '' && regex.test(email) === true && password !== '' & confPassword !== '' & password === confPassword && usernameErrorMessage === '' && emailErrorMessage === '') {
      requestNewAccount(username, password, email).then(data => {
        this.props.navigation.navigate("TabNavigator")
      })
    }
    else {
      console.log("NON OK")
    }
  }

  render() {
    const { username, email, password, confPassword, usernameErrorMessage, emailErrorMessage, passwordInputColor, passwordErrorMessage } = this.state
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
        onChangeText={(text) => this.setState({username: text})}
        value={username}
        errorMessage={usernameErrorMessage}
        request={this._requestUsername()}
      />
      <Input
        placeholder='Email'
        leftIcon={
          <Icon
            name='envelope'
            size={24}
            color='black'
          />
        }
        inputStyle={styles.input_style}
        onChangeText={(text) => this.setState({email: text})}
        value={email}
        errorMessage={emailErrorMessage}
        request={this._requestEmail()}
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
        inputStyle={[styles.input_style, {color: passwordInputColor}]}
        onChangeText={(text) => this.setState({password: text})}
        value={password}
      />
      <Input
        placeholder='Confirm Password'
        leftIcon={
          <Icon
            name='lock'
            size={24}
            color='black'
          />
        }
        inputStyle={[styles.input_style, {color: passwordInputColor}]}
        onChangeText={(text) => this.setState({confPassword: text})}
        value={confPassword}
        errorMessage={passwordErrorMessage}

      />
      <Button
        title='Create'
        onPress={() => this._createAccount()}
      />
      </View>
    )
  }
}

//password={this._passwordIsSimilar()}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_style: {
    marginLeft: 10
  }
})

export default CreateAccount
