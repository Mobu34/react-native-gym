// Components/ExerciseItem.js

import React from 'react'
import { StyleSheet, View, Text} from 'react-native'

class ExerciseItem extends React.Component {

  _number(number, exercise) {
    for (var i = 0; i < number.length; i++) {
      if (number[i] === exercise) {
        return (
          <Text>{i + 1}</Text>
        )
      }
    }
  }

  render() {
    const { exercise, number } = this.props
    return (
      <View style={styles.main_container}>
        <Text style={styles.exercise_text}>Exercise n°{this._number(number, exercise)}</Text>
        <Text >{exercise.Name}</Text>
        <Text>{exercise.Reps} reps in {exercise.Tempo} execution</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  exercise_text: {
    fontWeight: 'bold'
  }
})

export default ExerciseItem
