//Screens/ExerciseDetailsScreen.js

import React from 'react'
import { StyleSheet, View, Text, Button, Linking } from 'react-native'
import { requestDetails } from '../Data/DataFromServer'

class ExerciseDetailsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      desc: '',
      video: ''
    }
  }

  componentWillMount() {
    const name = this.props.navigation.getParam('details').name
    requestDetails(name).then(data => {
      console.log(data[0].description)
      this.setState({
        desc: data[0].description,
        video: data[0].video_link
      })
    })
  }

  render() {
    const { desc, video } = this.state
    return (
      <View style={styles.main_container}>
        <Text>{desc}</Text>
        <Button
          title='Video of the exercise'
          onPress={() => Linking.openURL(video)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})

export default ExerciseDetailsScreen
