// Screens/WelcomeScreen.js

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Button, ImageBackground } from 'react-native'
import LevelGoalComponent from '../Components/LevelGoalComponent'
import AnimationWelcome from '../Animations/AnimationWelcome'

class WelcomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={require('../Images/3-méthodes-musculation.jpg')}
          style={styles.image_background}
        >
        <AnimationWelcome>
          <LevelGoalComponent style={styles.level_goal} nav={this.props.navigation}/>
        </AnimationWelcome>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  image_background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  welcome_container: {

  },
  level_goal: {

  }
})

export default WelcomeScreen
