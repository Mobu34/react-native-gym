// Screens/ContactUsScreen.js

import React from 'react'
import { Linking, StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native'

class ContactUsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      object: '',
      message: ''
    }
  }

  _send() {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { email, object, message } = this.state
    console.log('Regex Test : ' + regexEmail.test(email) + ', object : ' + object + ', message : ' + message )
    if (regexEmail.test(email) && object.length > 0 && message.length > 0) {
      Linking.openURL('mailto:fezefdsfsf@efdsffS.com?subject=fqfdsfdsf&body=dsfsdfsdf')
      Alert.alert(
        'Confirmation',
        'Please press OK to send the message, otherwise press "Cancel"',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => {
            Alert.alert(
              'Message sent',
              'Your message has been sent',
              [
                {text: 'OK', onPress: () => {
                  this.props.navigation.goBack()
                  }
                }
              ]
            )
            }
          }
        ]
      )
    }
    else {
      if (!regexEmail.test(email)) {
        Alert.alert(
          'Please enter a valid email address'
        )
      }
      else if (object.length === 0 || message.length === 0) {
        Alert.alert(
          'The object and the message must be fulfilled'
        )
      }
    }
  }

  render() {
    const { email, object, message } = this.state
    return (
      <View style={styles.main_container}>
        <View style={styles.input_container}>
          <Text>Your email address :</Text>
          <TextInput
            style={styles.textinput_email}
            autoCapitalize='none'
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.input_container}>
          <Text>Subject :</Text>
          <TextInput
            style={styles.textinput_email}
            onChangeText={(text) => this.setState({ object: text })}
          />
        </View>
        <View style={styles.input_container}>
          <Text>Message :</Text>
          <TextInput
            style={styles.textinput_message}
            multiline={true}
            onChangeText={(text) => this.setState({ message: text })}
          />
        </View>
        <Button
          title='Send'
          onPress={() => Linking.openURL('http://www.google.com')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center'
  },
  input_container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30
  },
  textinput_email: {
    width: '80%',
    borderBottomWidth: 1
  },
  textinput_message: {
    width: '80%',
    borderWidth: 1,
    height: 100
  }
})

export default ContactUsScreen
