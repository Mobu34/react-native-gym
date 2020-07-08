// Screens/GeneratedProgramScreen.js

import React from 'react'
import { Image, StyleSheet, View, Text, FlatList, TouchableHighlight, TouchableOpacity, Alert } from 'react-native'
import ExercisesList from '../Components/ExercisesList'
import AnimationButtonRegenerate from '../Animations/AnimationButtonRegenerate'
import AnimationButtonSave from '../Animations/AnimationButtonSave'
import AnimationButtonShare from '../Animations/AnimationButtonShare'
import { shareProgramFunction } from '../Functions/ShareProgramFunction'
import { Overlay, Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'

class GeneratedProgramScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isButtonDisplayed: false,
      //exercisesToExclude: [],
      program: [],
      //data: [],
      mainColor: '#fff',
      share: ''
    }
  }

  _changeValue() {
    if (this.state.isButtonDisplayed === false) {
      this.setState({
        isButtonDisplayed: true,
        mainColor: 'grey'
      })
      this._showRegenerateButton()
      this._showSaveButton()
    }
    else {
      this.setState({
        isButtonDisplayed: false,
        mainColor: '#fff',
        share: ''
      })
    }
  }

  _regenerateTheProgram() {
    this.setState({
      program: [],
      duplicate: [],
      isButtonDisplayed: false,
      mainColor: '#fff'
    })
    this._generateExercises(this.props.navigation.getParam('data'), this.props.navigation.getParam('duration'))
  }

  _showRegenerateButton() {
    if (this.state.isButtonDisplayed === true) {
        return (
          <AnimationButtonRegenerate>
          <Text style={styles.text_buttons}>Regenerate</Text>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {this._regenerateTheProgram()}}
            >
              <Image
                style={styles.images}
                source={require('../Images/ic_regenerate.png')}
              />
            </TouchableOpacity>
          </AnimationButtonRegenerate>
        )
      }
      else {
        return (
          <View></View>
        )
      }
  }

  _saveTheProgram() {
    if (this.state.program !== this.state.duplicate) {
      console.log(this.state.program)
      const action = { type: "SAVE_PROGRAM", value: this.state.program }
      this.props.dispatch(action)
      this.setState({
        duplicate: this.state.program,
        isButtonDisplayed: false,
        mainColor: '#fff'
      })
      Alert.alert(
        'Information',
        'This program has been saved, you will find it into the "Programs & Exercises" tab',
        {text: 'OK'}
      )
    }
    else {
        this.setState({
            isButtonDisplayed: false,
            mainColor: '#fff'
        })
        Alert.alert(
        'Warning',
        'This program has already been saved',
        {text: 'OK'}
        )
    }
  }

  _showSaveButton() {
    if (this.state.isButtonDisplayed === true) {
        return (
            <AnimationButtonSave>
              <Text style={styles.text_buttons}>Save</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {this._saveTheProgram()}}
              >
                <Image
                  style={styles.images}
                  source={require('../Images/ic_save.png')}
                />
              </TouchableOpacity>
            </AnimationButtonSave>
        )
      }
      else {
        return (
          <View></View>
        )
      }
  }

  _shareProgram() {
    const { program } = this.state
    shareProgramFunction(program)
    this.setState({
      isButtonDisplayed: false,
      mainColor: '#fff'
    })
  }

  _showShareButton() {
    const { isButtonDisplayed } = this.state
    if (isButtonDisplayed === true) {
        return (
            <AnimationButtonShare>
              <Text style={styles.text_buttons}>Share</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {this._shareProgram()}}
              >
                <Image
                  style={styles.images}
                  source={require('../Images/ic_share.png')}
                />
              </TouchableOpacity>
            </AnimationButtonShare>
        )
      }
      else {
        return (
          <View></View>
        )
      }
  }

  _buttonToRegenerateAndSave() {
    return (
      <TouchableOpacity
        style={styles.main_button}
        onPress={() => {this._changeValue()}}
      >
        <Image
          style={styles.images}
          source={require('../Images/ic_display_buttons.png')}
        />
      </TouchableOpacity>
    )
  }

  _backToInitialColor() {
    console.log("back to initial state")
    const { isButtonDisplayed, mainColor } = this.state
    if (isButtonDisplayed === true) {
      this.setState({
        isButtonDisplayed: false,
        mainColor: '#fff',
        share: ''
      })
    }
  }

  _generateExercises(data, duration) {
    console.log(data)
    switch (duration) {
      case '0:30':
        var numberOfExercises = 3
        break
      case '0:45':
        var numberOfExercises = 4
        break
      case '1:00':
        var numberOfExercises = 5
        break
      case '1:15':
        var numberOfExercises = 6
        break
      case '1:30':
        var numberOfExercises = 7
        break
      case '2:00':
        var numberOfExercises = 8
        break
    }
    const { program } = this.state
    const shortid = require('shortid')
    let exercisesToExclude = []
    while (program.length !== numberOfExercises) {
        let random = Math.floor(Math.random() * (data.length - 1))
        //console.log(exercisesToExclude.indexOf(data[random].ID_SameExercise))
        if (program.map(function(e) { return e.ID_SameExercise ;}).indexOf(data[random].ID_SameExercise) === -1) {
            //program.indexOf(data[random].ID_SameExercise)
            program.push(data[random])
        }
    }
      
    for (let i = 0; i < program.length; i++) {
      program[i].ID = shortid.generate()
      
    }
      //console.log(program)
  }

  render() {
    //console.log(this.props.navigation.getParam('data'))
    const { program, mainColor } = this.state
    return (
      <TouchableHighlight
        style={styles.main_container}
        onPress={() => this._backToInitialColor()}
        underlayColor='#fff'
      >
        <View style={styles.main_container}>
        <ExercisesList
          data={program}
          mainColor={mainColor}
        />
        {this._generateExercises(this.props.navigation.getParam('data'), this.props.navigation.getParam('duration'))}
        {this._showRegenerateButton()}
        {this._showSaveButton()}
        {this._showShareButton()}
        {this._buttonToRegenerateAndSave()}
        </View>
      </TouchableHighlight>
    )
  }
}

//

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  main_button: {
    position: 'absolute',
    backgroundColor: '#295aff',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  images: {
    width: 30,
    height: 30
  },
  buttons: {
    position: 'absolute',
    backgroundColor: '#99c7ff',
    width: 40,
    height: 40,
    right: 40,
    //bottom: 150,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_buttons: {
    position: 'absolute',
    right: 95,
    top: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 3,
    //borderRadius: 50,
    //borderColor: 'red',
    //borderWidth: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    savedPrograms: state.saveProgram.savedPrograms
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneratedProgramScreen)
