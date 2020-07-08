// Screens/BackScreen.js

import React from 'react'
import { StyleSheet, View, Text, Button, Platform, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import AllExercises from '../Components/AllExercises'

class BackScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    if (Platform.OS === 'ios') {
      return {
        headerLeft: <TouchableOpacity
                      style={styles.drawer_icon}
                      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                      <Image
                        style={styles.icon}
                        source={require('../Images/ic_drawer.png')}/>
                    </TouchableOpacity>
      }
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <AllExercises nav={this.props.navigation} targetMuscle={"BACK"} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  drawer_icon: {
    marginLeft: 15
  },
  icon: {
    width: 30,
    height: 30
  }
})

export default BackScreen
