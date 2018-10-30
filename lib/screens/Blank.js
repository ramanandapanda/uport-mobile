import React from "react"
import { View, Text } from 'react-native'

class Blank extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <View>
          <Text>Hello I'm a blank screen!</Text>
        </View>
      </View>
    )
  }
}

export default Blank
