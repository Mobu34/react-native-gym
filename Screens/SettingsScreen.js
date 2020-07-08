// Components/SettingsScreen.js

import React from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'

class SettingsScreen extends React.Component {

  _changeLevelGoal() {
    this.props.navigation.navigate('ChangeLevelGoalScreen')
  }

  _contactUs() {
    this.props.navigation.navigate('ContactUsScreen')
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Button
          title="Change level & goal"
          onPress={() => this._changeLevelGoal()}
        />
        <Button
          title="Contact Us"
          onPress={() => this._contactUs()}
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
  textinput: {
    borderWidth: 1,
    width: '80%',
    height: 200
  }
})

export default SettingsScreen
