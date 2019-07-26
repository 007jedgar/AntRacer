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

  //rewrite with promises
  calculateOdds = () => {
    this.setState({
      calculating: true,
      antsListStatus: 'Calculating...'
    })

    let calculatedCount = 0
    Object.keys(this.state.ants).forEach((ant, i) => {
    const callback = (likelihoodOfAntWinning) => {
      const newState = merge({}, this.state)

      newState.ants[ant].winLikelihood = Math.round(likelihoodOfAntWinning * 100) 
      calculatedCount++
      if (calculatedCount === Object.keys(this.state.ants).length) {
        newState.calculated = true
        newState.antsListStatus = "Here's the morning line"
      }
      this.setState(newState)
    }
    this.generateAntWinLikelihoodCalculator()(callback)
    })
  }

  calculateOdds1() {
    this.setState({ antsListStatus: 'Calculating...'})
    //create array of promises for promise.all
    let promises = []
    // increase the percentage on button bar based on array size
    // let progressIncrease = 85 / this.state.ants.length
    let prevAnts = this.state.ants
    let currentCalc = []
    prevAnts.forEach((ant, i) => { 
      // set data for progress bar and progress state 
      let newAntsProgress = [...prevAnts]
      newAntsProgress[i] = ant
      newAntsProgress[i].antsListStatus = 'Calculating...'
      this.setState({ ants: newAntsProgress })

      //create promise
      const pinkyPromise = new Promise((resolve, reject) => {
        this.generateAntWinLikelihoodCalculator()(resolve)
      }).then((data) => {
        // set likelihood and create progress state and percentage for individual ants
        let newAnts = this.state.ants
        newAnts[i].winLikelihood = Math.round(data * 100)
        this.setState({ ants: newAnts })
        
        // resolve with likelihood data
        return newAnts[i]
      })

      promises.push(pinkyPromise)
    })
    
    Promise.all(promises)
    .then((values) => {
      console.log(values)
       let ants = values.sort((a,b)=>{
        return a.winLikelihood < b.winLikelihood
      })

      this.setState({ ants , antsListStatus: `Here's the Morning Line`})
      this.props.oddsCalculated(ants)
    }).catch((error) => {
      console.log(error)
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
    const { antsListStatus, ants } = this.state;
    let orderedAnts = ants.sort(function(a, b) {
      return b.winLikelihood - a.winLikelihood;
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
          extraData={this.state}
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