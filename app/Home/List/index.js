import React, { Component } from 'react';
import {
  FlatList , 
  Text, 
  View, 
  StyleSheet, 
  ActivityIndicator,
} from 'react-native';
import Store from './store';
import AntCard from '../AntCard.js'
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { merge } from 'lodash';
import {
  Spinner
} from '../../common'

class List extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      antsListStatus: 'Not yet run',
      data: null,
      loading: false,
      ants: [],
      calculating: false,
    }
  
    calculated = 0;
    store = new Store();
  }

  componentDidMount () {
    // this._getAllAnts();

    const ants = []
    let endpoint = 'https://antserver-blocjgjbpw.now.sh/graphql?query={ants{name,length,weight,color}}';
    fetch(endpoint)
    .then(results => results.json()).then(data => {
      data.data.ants.forEach((a, idx) => {
        // ants[idx] = ant;
        // ants[idx].winLikelihood = 0;
        // ants[idx].imageSrc = require(`../antPics/ant${idx}.png`);
        let ant = a
        ant.winLikelihood = 0
        ants.push(ant)
      })
      return ants
    }).then((ants) => this.setState({ ants }))
    .catch((err) => console.log(err))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ants) {
      console.log(nextProps.ants)
    }
  }

  calculateOdds = () => {
    this.setState({
      calculating: true
    });
    let antOddsCalculatedCount = 0;
    Object.keys(this.state.ants).forEach(idx => {
      const callback = (likelihoodOfAntWinning) => {
        const newState = merge({}, this.state);
        newState.ants[idx].winLikelihood = likelihoodOfAntWinning;
        newState.ants = this.reorderByWinLikelihood(newState.ants);
        antOddsCalculatedCount++;
        if (antOddsCalculatedCount === Object.keys(this.state.ants).length) {
          newState.calculated = true;
          newState.calculating = false;
          newState.antsListStatus = 'All Calculated'
        }
        this.setState(newState);
      }
      this.generateAntWinLikelihoodCalculator()(callback);
    })
  }


  reset = () => {
    const ants = this.state.ants;
    Object.keys(ants).forEach(idx => {
      ants[idx].winLikelihood = 0;
    });
    this.setState({
      ants: ants,
      calculating: false,
      calculated: false
    })
  }

  async _getAllAnts () {
    const data = await this.store.getAllAntsList();
    console.log(data)
    this.setState({data, antsListStatus: 'In Progress'});
    this.props.updateCarousel(data);
  }

  _renderItem = ({item}) => {
    return (
      <AntCard
        ant={item}
      />
    );
  }

  _keyExtractor = (item, index) => item.name;

  renderAnts () {
    const { antsListStatus, data } = this.state;
    return (
      <View style={{ marginTop: moderateScale(10)}}>
        
        <Text style={styles.statusText}>{antsListStatus}</Text>
        {this.renderLoading()}
        <FlatList
          data={this.state.ants}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }

  generateAntWinLikelihoodCalculator() {
    var delay = 1000 + Math.random()*7000;
    var likelihoodOfAntWinning = Math.random();
    return function(callback) {
      setTimeout(function() {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  reorderByWinLikelihood = (antsObj) => {
    let antsArr = [];
    Object.keys(antsObj).forEach(idx => {
      antsArr.push(antsObj[idx])
    })
    antsArr.sort(function(a, b) {
      return b.winLikelihood - a.winLikelihood;
    })
    let newAntsObj = {};
    for (let i = 0; i < antsArr.length; i++) {
      newAntsObj[i] = antsArr[i];
    }
    return newAntsObj;
  }

  renderLoading() {
    if (this.state.calculating) {
      return (
        <View style={{
          marginTop: moderateScale(35)
        }}>
          <Spinner color="#787878"/>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderAnts()}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 3,
  },
  statusText: {
    fontSize: '24@ms',
    textAlign: 'center',
  },
});

export default List;