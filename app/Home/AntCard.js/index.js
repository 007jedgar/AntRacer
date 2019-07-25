import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  ScaledSheet
} from 'react-native-size-matters'

function AntCard(props) {
  const { name, age, color, weight, } = props.ant
  const { state, percentChance } = props
  const { container } = styles 
  return (
    <TouchableOpacity>
      <View style={container}>
        <Text>{name}</Text>
        <Text>{age}</Text>
        <Text>{weight}</Text>
        <Text>{color}</Text>

        <View>
          <Text>{percentChance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    borderBottomWidth: '3@ms',
    borderWidth: '1@ms',
    margin: '5@ms',
    padding: '2@ms',
  },  
})

export default AntCard