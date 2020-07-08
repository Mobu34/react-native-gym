// Components/ProgramsScreen.js

import React from 'react'
import { FlatList, Platform, StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import { connect } from 'react-redux'
import ProgramItem from '../Components/ProgramItem'

class ProgramsScreen extends React.Component {

  _showPrograms() {
    console.log(this.props.savedPrograms)
    if (this.props.savedPrograms.length === 0) {
      return (
        <Text>No programs</Text>
      )
    }
    else {
      console.log(this.props.savedPrograms)
      //console.log(this.props.savedPrograms[0][0].ID)
      return (
        <FlatList
          style={styles.flatlist_container}
          data={this.props.savedPrograms}
          keyExtractor={(item) => item.ID}
          renderItem={({item, index}) => <ProgramItem program={item} id={index} nav={this.props.navigation} />}
        />
      )
    }
  }
  //<ProgramItem program={item} id={index} nav={this.props.navigation} />

  render() {
    return (
      <View style={styles.main_container}>
        {this._showPrograms()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  flatlist_container: {
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

const mapStateToProps = (state) => {
  return {
    savedPrograms: state.saveProgram.savedPrograms
  }
}

export default connect(mapStateToProps)(ProgramsScreen)