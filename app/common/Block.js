import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  ScaledSheet,
  scale,
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

const Block = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = ScaledSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    borderColor: '#2BA888',
    marginBottom: verticalScale(-5),
    flex: 1,
    width: Dimensions.get('window').width
  },
});

export { Block };
