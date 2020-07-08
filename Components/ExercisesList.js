import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import ExerciseItem from './ExerciseItem'

class ExercisesList extends React.Component {

  /*constructor(props) {
    super(props)
    this.state = {
      mainColor: '#fff'
    }
  }*/

  _getData(id) {
    if (this.props.navigation !== undefined) {
        console.log(this.props.navigation.getParam('data'))
      return (
        this.props.navigation.getParam('data')
      )
    }
    else {
      console.log(this.props.data)
      return (
        this.props.data
      )
    }
  }

//
  render() {
    const { mainColor } = this.props
    return (
      <View style={[styles.main_container, {backgroundColor: mainColor}]}>
        <FlatList
          style={styles.flatlist}
          data={this._getData()}
          keyExtractor={(item) => item.ID}
          renderItem={({item, index}) => <ExerciseItem exercise={item} number={this._getData(item)} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default ExercisesList
