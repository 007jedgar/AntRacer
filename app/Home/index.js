import React, {Component} from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Easing,
  Animated,
  Dimensions,
} from 'react-native';

import List from './List';
import AnimatedAnt from './AnimatedAnt';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feffea',
    padding: 10,
  },
  calculate: {
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
  }
});

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      antPosition: new Animated.ValueXY({ x: -50, y: 0 }),
      antPosition1: new Animated.ValueXY({ x: -50, y: 0 }),
      antPosition2: new Animated.ValueXY({ x: -50, y: 0 }),
      animationCount: 0,
    }
  }

  componentDidMount () {
    this.moveAnt()
  }

  _calculateAll = () => {
    this._list.calculateAll();
  };

  moveAnt() {
    this.state.antPosition.setValue({ x: -50, y: 0 })
    this.state.antPosition1.setValue({ x: -50, y: 0 })
    this.state.antPosition2.setValue({ x: -50, y: 0 })
    const { width } = Dimensions.get('window')

    let a = Animated.timing(this.state.antPosition, {
      toValue: {x: width, y: 0},
      duration: Math.random() * (3100 - 2500) + 2500,
      easing: Easing.linear,
      useNativeDriver: true
    })
    let a1 = Animated.timing(this.state.antPosition1, {
      toValue: {x: width, y: 0},
      duration: Math.random() * (3100 - 2500) + 2500,
      easing: Easing.linear,
      useNativeDriver: true
    })
    let a2 = Animated.timing(this.state.antPosition2, {
      toValue: {x: width, y: 0},
      duration: Math.random() * (3100 - 2600) + 2600,
      easing: Easing.linear,
      useNativeDriver: true
    })

    Animated.parallel([a, a1, a2]).start(() => {
      this.setState({ animationCount: this.state.animationCount + 1 })
      if (this.state.animationCount < 5) this.moveAnt();
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <List
          ref={component => this._list = component}
          updateCarousel={(data) => { this.setState({data})}} 
        />

        <AnimatedAnt style={{ 
            transform : this.state.antPosition.getTranslateTransform(),
            backgroundColor: 'blue'
          }} 
        />
        <AnimatedAnt style={{ 
            transform : this.state.antPosition1.getTranslateTransform(),
            backgroundColor: 'red'
          }} 
        />
        <AnimatedAnt style={{ 
            transform : this.state.antPosition2.getTranslateTransform(),
            backgroundColor: 'grey'
          }} 
        />
      </View>
    );
  }
}

export default Home;