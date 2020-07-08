// Animations/AnimationWelcome.js

import React from 'react'
import { StyleSheet, Animated } from 'react-native'

class AnimationWelcome extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultHeight: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.defaultHeight,
      {
        toValue: 600,
        duration: 600
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={[ styles.welcome_style, { height: this.state.defaultHeight }]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  welcome_style: {
    backgroundColor: 'rgba(204, 102, 0, 0.9)',
    width: '100%',
    //height: '75%',
    alignItems: 'center',
    borderTopLeftRadius: 185,
    borderTopRightRadius: 185,
    justifyContent: 'center'
  }
})

export default AnimationWelcome
