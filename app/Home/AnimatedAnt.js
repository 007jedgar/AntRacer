import React from 'react'
import {
  Image,
  Animated,
} from 'react-native'
import {
  ScaledSheet,
} from 'react-native-size-matters'
import FastImage from 'react-native-fast-image'

const AnimatedAnt = (props) => {
  return (
    <Animated.View style={[styles.progress, props.style]}>
      <Image 
        source={require('../assets/icons/ant.png')} 
        style={styles.ant}
      />
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  progress: {
    backgroundColor: '#aa746d',
    height: '40@ms',
    width: '40@ms',
  },
  ant: {
    width: '40@ms',
    height: '40@ms',
  },
})

export default AnimatedAnt