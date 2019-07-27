import React, { Component } from 'react';
import {
  FlatList , 
  Text, 
  View,
} from 'react-native';
import Store from './store';
import AntCard from '../AntCard.js'
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import {
  Spinner
} from '../../common'
import { merge } from 'lodash'

class List extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      antsListStatus: '',
      loading: false,
      ants: [],
      calculating: false,
      antsListStatus: 'Care to make a Blind Bet?',
      err: {},
    }
  
    calculated = 0;
    store = new Store();
  }

  componentDidMount () {
    this.fetchAnts()
  }

  fetchAnts() {
    const ants = []
    let endpoint = 'https://antserver-blocjgjbpw.now.sh/graphql?query={ants{name,length,weight,color}}';
    fetch(endpoint)
    .then(results => results.json()).then(data => {
      data.data.ants.forEach((a) => {
        let ant = a
        ant.winLikelihood = 0
        ants.push(ant)
      })
      return ants
    }).then((ants) => {
      this.setState({ ants })
      this.props.antsFetched()
    })
    .catch((err) => this.setState({ err }))
  }

  calculateOdds() {
    // Get likelihood for ant at the same time
    // Set state for each of ants

    // set initial state
    let promises = []
    let newState = { ...this.state }
    let ants = this.state.ants

    this.setState({
      calculated: true,
      antsListStatus: 'Calculating...'
    })
    
    // Loop through ants to create promises
    ants.forEach((ant, index) => {
      // promise returns ant with likelihood
      const tinyPromise = new Promise((res, rej) => {
        this.generateAntWinLikelihoodCalculator()(res)
      }).then((likelihood) => {
        // make an ant with likelihood and return it
        let newAnt = {...ant}
        
        newAnt.winLikelihood = Math.round(likelihood * 100)
        newAnt.status = 'complete'

        newState.ants[index] = newAnt
        

        this.setState({ 
          ants: newState.ants,
          antsListStatus: 'The Morning Line is in',
          calculated: true,
        })
        return newAnt
      })

      promises.push(tinyPromise)
    })
    
    Promise.all(promises).then((antsWithLikelihood) => {
      this.setState({ ants: antsWithLikelihood })
    })
  }

  generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random()
  
    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay)
    }
  }

  reorderByWinLikelihood = (antsObj) => {
    let antsArr = [];
    Object.keys(antsObj).forEach(idx => {
      antsArr.push(antsObj[idx])
    })

    let bla = Object.values(antsObj)

    antsArr.sort(function(a, b) {
      return b.winLikelihood - a.winLikelihood;
    })

    let newAntsObj = {};
    for (let i = 0; i < antsArr.length; i++) {
      newAntsObj[i] = antsArr[i];
      
    }
    return newAntsObj;
  }

  reset = () => {
    const ants = this.state.ants;
    Object.keys(ants).forEach(idx => {
      ants[idx].winLikelihood = 0;
    })
    
    this.setState({
      ants: ants,
      calculating: false,
      calculated: false
    })
    this.fetchAnts()
  }

  _renderItem = ({item}) => {
    let backgroundColor = item.selected? '#000' : '#feffea'
    return (
      <AntCard
        ant={item}
        checkMarkStyle={{ backgroundColor }}
        onPress={(ant) => {
          // Objective: find the ant item, make it selected
          if (ant.selected) {
            let ants = this.state.ants
            ants.forEach((a, index) => {
              // change object in array
              // replace array with new array
              if (a.name === ant.name) {
                // if a match... replace it
                a.selected = false 
                ants[index] = a
                this.setState({ ants })
                this.props.selectedAnt(ants)
              }
            })
          } else {
            let ants = this.state.ants
            ants.forEach((a, index) => {
              // change object in array
              // replace array with new array
              if (a.name === ant.name) {
                // if a match... replace it
                a.selected = true 
                ants[index] = a
              } else {
                a.selected = false 
                ants[index] = a
              }

              this.setState({ ants })
              this.props.selectedAnt(ants)
            })
          }

        }}
      />
    )
  }

  _keyExtractor = (item, index) => item.name;

  renderAnts () {
    const { antsListStatus, ants } = this.state

    let orderedAnts = ants.sort((a, b) => {
      return b.winLikelihood - a.winLikelihood
    })

    if (!orderedAnts || orderedAnts.length < 1) {
      return (
        <View style={{ alignSelf: 'center', marginTop: moderateScale(30)}}>
          <Text>There's a 5 ant pileup on the track</Text>
        </View>
      )
    } 

    return (
      <View style={{ marginTop: moderateScale(10)}}>
        
        <Text style={styles.statusText}>{antsListStatus}</Text>
        {/* {this.renderLoading()} */}
        <FlatList
          data={orderedAnts}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
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
    fontFamily: 'DamascusMedium',
  },
})

export default List;