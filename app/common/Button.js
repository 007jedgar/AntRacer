import React from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';

const Button = ({ text, btnStyle, textStyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle ]}>
      <Text style={[styles.text, textStyle ]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  btn: {
    alignSelf: 'center',
    margin: '10@ms',
    borderBottomWidth: '3@ms',
    borderRightWidth: '2@ms',
    borderWidth: '1@ms',
    borderColor: '#676767',
    padding: '3@ms',
  },
  text: {
    textAlign: 'center',
    fontSize: '25@ms',
  }
})

export {Button}