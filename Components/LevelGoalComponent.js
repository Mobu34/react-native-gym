// Components/LevelGoalComponent.js

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Button, Text, ActivityIndicator, Alert } from 'react-native'
import { Avatar, Overlay } from 'react-native-elements'
import { connect } from 'react-redux'

class LevelGoalComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sizeJunior: 'medium',
      sizeIntermediate: 'medium',
      sizeSenior: 'medium',
      sizeDry: 'medium',
      sizeMaintain: 'medium',
      sizeBulk: 'medium',
      submit: 'Let\'s go',
      changeSubmitValue: false,
      changeNav: 'TabNavigator',
      submitLevel: '',
      submitGoal: '',
      warningMessage: '',
      loading: false,
      overlay: false
    }
  }

  componentWillMount() {
    const { level, goal } = this.props
    const { changeSubmitValue } = this.state
    if (level.length > 0 && goal.length > 0 && changeSubmitValue === false) {
      this.setState({
        submit: 'Save',
        changeSubmitValue: true,
        changeNav: 'GenerateNewProgramScreen'
      })
    }
  }

  _selectLevel (selectedLevel) {
    this.setState({
      submitLevel: selectedLevel
    })
    switch(selectedLevel) {
      case 'Junior':
        this.setState({
          sizeJunior: 'large',
          sizeIntermediate: 'medium',
          sizeSenior: 'medium'
        })
        break
      case 'Intermediate':
        this.setState({
          sizeJunior: 'medium',
          sizeIntermediate: 'large',
          sizeSenior: 'medium'
        })
        break
      case 'Senior':
        this.setState({
          sizeJunior: 'medium',
          sizeIntermediate: 'medium',
          sizeSenior: 'large'
        })
        break
    }
  }

  _selectGoal (selectedGoal) {
    this.setState({
      submitGoal: selectedGoal
    })
    switch(selectedGoal) {
      case 'Dry':
        this.setState({
          sizeDry: 'large',
          sizeMaintain: 'medium',
          sizeBulk: 'medium'
        })
        break
      case 'Maintain':
        this.setState({
          sizeDry: 'medium',
          sizeMaintain: 'large',
          sizeBulk: 'medium'
        })
        break
      case 'Bulk':
        this.setState({
          sizeDry: 'medium',
          sizeMaintain: 'medium',
          sizeBulk: 'large'
        })
        break
    }
  }

  _textWhenSomethingIsSaved() {
    const didBlurSubscription = this.props.nav.addListener(
      'didBlur',
      payload => {
        setState({
          warningMessage: 'New settings saved'
        })
      }
    )
    console.log(didBlurSubscription)
    const { warningMessage } = this.state
    return (
      <Text>{warningMessage}</Text>
    )
  }

  _letsGo() {
    const { submitLevel, submitGoal, changeNav, changeSubmitValue } = this.state
    console.log(submitLevel + " & " + submitGoal)
    let level
    let goal
    console.log(level)
    switch(submitLevel) {
        case 'Junior':
        level = 1
        break
    }
    switch(submitGoal) {
        case 'Dry':
        goal = 1
        break
    }
    console.log(level + " & " + goal)
    if (submitLevel !== '' && submitGoal !== '') {
      const actionLevel = { type: 'SELECT_LEVEL', value: level }
      this.props.dispatch(actionLevel)
      const actionGoal = { type: 'SELECT_GOAL', value: goal }
      this.props.dispatch(actionGoal)
      if (changeSubmitValue === true) {
        Alert.alert(
          'Warning',
          'You changed your level and/or your level, you will be redirected to the home page',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => {
              this.props.nav.goBack()
              this.props.nav.navigate(changeNav)
              }
            }
          ]
        )
      }
      else {
        this.props.nav.navigate(changeNav)
      }
    }
    else if (submitLevel === '' || submitGoal === '' && changeSubmitValue === false) {
      Alert.alert(
        'Warning',
        'Please select a level and a goal',
        {text: 'OK'}
      )
    }
  }

  render() {
    const { sizeJunior, sizeIntermediate, sizeSenior, sizeDry, sizeMaintain, sizeBulk, warningMessage, loading, overlay } = this.state
    return (
      <View style={styles.main_container}>
        <Overlay
          isVisible={overlay}
          width={200}
          height={200}
        >
          <View>
            <ActivityIndicator animating={loading} size="large" color="black" />
            <Text style={styles.warning_message}>{warningMessage}</Text>
          </View>
        </Overlay>
        <Text style={{fontSize: 20}}>Level</Text>
        <View style={styles.level_goal_container}>
          <TouchableOpacity
            onPress={() => this._selectLevel('Junior')}
            style={styles.level_goal_touchableopacity}
          >
            <Avatar
              size={sizeJunior}
              rounded
              title='JR'
            />
            <Text>Junior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._selectLevel('Intermediate')}
            style={styles.level_goal_touchableopacity}
          >
            <Avatar
              size={sizeIntermediate}
              rounded
              title='IT'
            />
            <Text>Intermediate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._selectLevel('Senior')}
            style={styles.level_goal_touchableopacity}
          >
            <Avatar
              size={sizeSenior}
              rounded
              title='SR'
            />
            <Text>Senior</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20}}>Goal</Text>
        <View style={styles.level_goal_container}>
          <TouchableOpacity
            onPress={() => this._selectGoal('Dry')}
            style={styles.level_goal_touchableopacity}
          >
            <Avatar
              size={sizeDry}
              rounded
              title='DR'
            />
            <Text>Dry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._selectGoal('Maintain')}
            style={styles.level_goal_touchableopacity}
          >
            <Avatar
              size={sizeMaintain}
              rounded
              title='MT'
            />
            <Text>Maintain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._selectGoal('Bulk')}
            style={styles.level_goal_touchableopacity}
          >
            <Avatar
              size={sizeBulk}
              rounded
              title='BK'
            />
            <Text>Bulk</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title={this.state.submit}
            onPress={() => this._letsGo()}
            color={'#000'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    alignItems: 'center'
  },
  level_goal_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 400,
    marginVertical: 20
  },
  level_goal_touchableopacity: {
    alignItems: 'center',
  },
  warning_message: {
    fontSize: 24
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

export default connect(mapStateToProps, mapDispatchToProps)(LevelGoalComponent)
