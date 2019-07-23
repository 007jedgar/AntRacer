import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Spinner = ({ size, color }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color={color} size={size || 'large' }/>
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export { Spinner };




//space
