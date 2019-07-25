import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  ScaledSheet,
} from 'react-native-size-matters'

const ProgressBar = (props) => {
  return (
    <View style={styles.progress}/>
  )
}

const styles = ScaledSheet.create({
  progress: {
    backgroundColor: '#aa746d',
    height: '5@ms',
    width: '100@ms',
  },
})

export default ProgressBar