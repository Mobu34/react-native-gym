// Screens/ChangeLevelGoalScreen.js

import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import LevelGoalComponent from '../Components/LevelGoalComponent'

class ChangeLevelGoalScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <LevelGoalComponent nav={this.props.navigation} />
      </View>
    )
  }
}
/*<Button
  title="test"
  onPress={() => this._test()}
/>*/
//<LevelGoalComponent nav={this.props.navigation} />
const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ChangeLevelGoalScreen
