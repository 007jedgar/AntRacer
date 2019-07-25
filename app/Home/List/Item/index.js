import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
} from 'react-native';

class Item extends React.Component {

  componentDidMount () {
    this._calculate();
  }

  _calculate = () => {
    this.generateAntWinLikelihoodCalculator();
    this.props.ant.setState('In Progress');
  }

  async generateAntWinLikelihoodCalculator () {
    const delay = 1 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();
    setTimeout(() => {
      this._setLikelihood(likelihoodOfAntWinning);
    }, delay);
  }

  _setLikelihood(likelihoodOfAntWinning) {
    const percentage = likelihoodOfAntWinning.toFixed(2) * 100;
    const odds = parseInt(percentage);
    this.props.percentageListener(this.props.ant, odds);
  }

  render () {
    const {name, state, odds, weight, color } = this.props.ant;
    return (
      <View style={styles.itemContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={styles.name}>
          {name}
        </Text>
        <Text style={styles.state}>{`${state}`}</Text>
        <Text style={styles.odds}>{`${odds}%`}</Text>
      </View>
    );
  }
}

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    height: 40,
    margin: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    width: 100,
    maxWidth: 100,
    marginRight: 25
  },
  state: {
    width: 90,
    marginRight: 40
  },
  odds: {
    marginRight: 10,
    width: 40
  },
});