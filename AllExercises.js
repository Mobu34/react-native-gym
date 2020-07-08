// Components/AllExercises.js

import React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Data from '../Data/Data'
import { requestAllExercises } from '../Data/DataFromServer'
import { connect } from 'react-redux'

class AllExercises extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
      isLoading: true
    }
  }

  _displayExercises() {
    const { level, goal } = this.props
    requestAllExercises(level, goal).then(data => {
      const { exercises } = this.state
      let tab = []
      for (var i = 0; i < data.length; i++) {
        if (this.props.targetMuscle === data[i].muscle && tab.indexOf(data[i].name) === -1) {
          exercises.push(data[i])
          tab.push(data[i].name)
        }
      }
    })
  }

  _detailsOfExercises(details, id) {
    this.props.nav.navigate("ExerciseDetailsScreen", {
      details: details[id]
    })
  }

  render() {
    const { exercises, isLoading } = this.state
    return (
      <View style={styles.main_container}>
        {this._displayExercises()}
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id_exercise.toString()}
          renderItem={({item, index}) => <TouchableOpacity onPress={() => this._detailsOfExercises(exercises, index)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    level: state.selectLevel.level,
    goal: state.selectGoal.goal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllExercises)
