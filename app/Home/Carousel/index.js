import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

import Swiper from './Swiper';

const AntsCarousel = ({data = []}) => {

  const items = data.map((ant) => {
    return (
      <View style={styles.slide1} key={ant.name}>
        <Text style={styles.text}>{ant.name}</Text>
        <Text style={styles.text}>{ant.odds}</Text>
      </View>
    )
  });

  const lastPosition = data.length - 1;

  return (
    <View style={styles.wrapper}>
      <Swiper
        autoplay={true}
        index={lastPosition}
        loop={true}
        showsPagination={false}>
        {items}
      </Swiper>
    </View>
  )
}

export default AntsCarousel;

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
});