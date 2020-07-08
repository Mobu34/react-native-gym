// Components/ProgramItem.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform, Share, PanResponder } from 'react-native'
import { connect } from 'react-redux'
import { shareProgramFunction } from '../Functions/ShareProgramFunction'

class ProgramItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 0
    }
    this._panResponder = PanResponder.create(
      {
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        //onMoveShouldSetPanResponder: (evt, gestureState) => true,
        //onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        /*onPanResponderGrant: (evt, gestureState) => {

        },*/
        onPanResponderMove: (evt, gestureState) => {
          if (this.state.width < 60) {
            this.setState({
              width: gestureState.dx
            })
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx >= 50) {
            this.setState({
              width: 50
            })
          }
          else {
            this.setState({
              width: 0
            })
          }
        }
        /*onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {

        },
        onPanResponderTerminate: (evt, gestureState) => {

        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true
        }*/
      }
    )
  }

  _deleteTheProgram() {
    console.log(this.props.id)
    const action = { type: "DELETE_PROGRAM", value: this.props.id }
    this.props.dispatch(action)
  }

  _detailOfTheProgram() {
    const { id } = this.props
    const { width } = this.state
    const action = { type: "BUTTONS", value: id }
    this.props.dispatch(action)
    if (width !== 0) {
      this.setState({
        width: 0
      })
    }
    else {
        console.log("TEST") 
      this.props.nav.navigate("ExercisesList", {
        data: this.props.savedPrograms
      })
    }
  }

  _shareProgram() {
    const { program } = this.props
    shareProgramFunction(program)
  }

  render() {
    const { program } = this.props
    console.log(program)
    return (
      <View
        style={styles.main_container}
      >
        <View style={styles.buttons_container}>
          <TouchableOpacity
            style={[styles.ic_share, {width: this.state.width}]}
            onPress={() => {this._shareProgram()}}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ic_delete, {width: this.state.width}]}
            onPress={() => {this._deleteTheProgram()}}
          >
          </TouchableOpacity>
        </View>
        <View
          style={styles.program_container}
          {...this._panResponder.panHandlers}
        >
          <TouchableOpacity
            onPress={() => this._detailOfTheProgram(program)}
          >
            <Text>{program[0].muscle_name} session</Text>
            <Text>{program.length} exercises</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black'
  },
  program_container: {
    width: '100%',
    backgroundColor: 'yellow'
  },
  buttons_container: {
    flexDirection: 'row',
  },
  ic_share: {
    backgroundColor: 'blue',
    height: 50
  },
  ic_delete: {
    backgroundColor: 'red',
    height: 50
  }
})

const mapStateToProps = (state) => {
  return {
    savedPrograms: state.saveProgram.savedPrograms,
    buttons: state.displayButtons.buttons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramItem)
