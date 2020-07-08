// Animations/AnimationButtonRegenerate.js

import React from 'react'
import { Animated } from 'react-native'

class AnimationButtonRegenerate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      positionBottom: new Animated.Value(80)
    }
  }

  componentWillMount() {
    Animated.timing(
      this.state.positionBottom,
      {
        toValue: 240,
        duration: 100
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ bottom: this.state.positionBottom }}
      >
        {this.props.children}
      </Animated.View>
    )
  }

}

export default AnimationButtonRegenerate
