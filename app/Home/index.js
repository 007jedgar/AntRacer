import React, {Component} from 'react';
import {
  Text, 
  View, 
  Easing,
  Animated,
  Dimensions,
} from 'react-native';

import List from './List';
import AnimatedAnt from './AnimatedAnt';
import { Button } from '../common';
import { ScaledSheet } from 'react-native-size-matters';


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feffea',
    padding: 10,
  },
  calculate: {
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
  },
  message: {
    margin: '2@ms',
    fontSize: '20@ms', 
    textAlign: 'center',
  },
});

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      antPosition: new Animated.ValueXY({ x: -50, y: 0 }),
      antPosition1: new Animated.ValueXY({ x: -50, y: 0 }),
      antPosition2: new Animated.ValueXY({ x: -50, y: 0 }),
      animationCount: 0,
      calculatedHasRan: false,
      ants: [],
      selected: {},
      message: '',
    }
  }

  componentDidMount () {
    this.moveAnt(6)
  }

  antSelectionChanged = (ants) => {
    ants.forEach((ant) => {
      if (ant.selected) {
        this.setState({ ants, selected: ant })
      }
    })
  }

  antPredictionCompleted = (ants) => {
    let selectionAnts = this.state.ants
    ants.forEach(ant => {
      if (ant[0] === selectionAnts[0]) {
        return this.setState({message :'You would have made a nice return'})
      } 
    })
    this.setState({message :'Better luck next time...'}) 
  }

  toReset = () => {
    this.setState({
      message: '',
      selected: {},
      ants: [],
      animationCount: 0,
    })
  }

  moveAnt(numOfLoops) {
    this.state.antPosition.setValue({ x: -50, y: 0 })
    this.state.antPosition1.setValue({ x: -50, y: 0 })
    this.state.antPosition2.setValue({ x: -50, y: 0 })
    const { width } = Dimensions.get('window')

    let a = Animated.timing(this.state.antPosition, {
      toValue: {x: width, y: 0},
      duration: Math.random() * (2100 - 1500) + 1500,
      easing: Easing.linear,
      useNativeDriver: true
    })

    let a1 = Animated.timing(this.state.antPosition1, {
      toValue: {x: width, y: 0},
      duration: Math.random() * (2100 - 1500) + 1500,
      easing: Easing.linear,
      useNativeDriver: true
    })

    let a2 = Animated.timing(this.state.antPosition2, {
      toValue: {x: width, y: 0},
      duration: Math.random() * (2100 - 1500) + 1500,
      easing: Easing.linear,
      useNativeDriver: true
    })

    Animated.parallel([a, a1, a2]).start(() => {
      this.setState({ animationCount: this.state.animationCount + 1 })
      if (this.state.animationCount <= numOfLoops) {
        return this.moveAnt(numOfLoops)
      }
      this.setState({ animationCount: 0 })
    })
  }

  renderCarolselAnts() {
    return (
      <View>
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
    )
  }

  renderBtn() {
    if (!this.state.calculatedHasRan) {
      return (
        <Button 
          text="Predict Race!" 
          onPress={() => { 
            this.setState({ animationCount: 0, calculatedHasRan: true }); 
            this.listRef.calculateOdds(); this.moveAnt(7)}
          } 
        />
      )
    } else {
      return (
        <Button 
          text="Predict Again!" 
          onPress={() => {
            this.toReset(); 
            this.listRef.reset(); 
            this.listRef.calculateOdds(); 
            this.moveAnt(3)}
          } 
        />
      )
    }
  }

  renderMessage() {
    if (this.state.message) {
      return (
        <View>
          <Text style={styles.message}>{this.state.message}</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <List 
          selectedAnt={this.antSelectionChanged} 
          ref={ref => this.listRef = ref} {...this.props}
          oddsCalculated={this.antPredictionCompleted}
        />

        {this.renderBtn()}
        {this.renderMessage()}
        {this.renderCarolselAnts()}
      </View>
    )
  }
}

export default Home;