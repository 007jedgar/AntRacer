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
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});

class List extends Component {

  state = {
    antsListStatus: 'Not yet run',
    data: null,
    loading: false,
  }

  calculated = 0;
  store = new Store();

  componentDidMount () {
    this._getAllAnts();
  }

  async _getAllAnts () {
    const data = await this.store.getAllAntsList();
    console.log(data)
    this.setState({data, antsListStatus: 'In Progress'});
    this.props.updateCarousel(data);
  }

  calculateAll () {
    if (this.state.antsListStatus === 'All Calculated') {
      this.calculated = 0;
      const data = this.state.data.slice();
      const antList = this.store.resetPercentageAndState(data);
      this._resetAntList(antList);
    }
  };

  _resetAntList (antList) {
    this.setState({ antsListStatus: 'In Progress', data: antList, loading: true });
    setTimeout(() => {
      this.setState({loading: false})
    }, 1);
  }

  _percentageListener = (antSelected, odds) => {
    const data = this.state.data.slice();
    const antList = this.store.percentageListener(data, antSelected, odds);
    this._updateData(antList);
  }

  _updateData(antList) {
    this.setState({data: antList});
    this._increase();
  }

  _renderItem = ({item}) => {
    return (
      <AntCard
        ant={item}
        percentageListener={this._percentageListener}
      />
    );
  }

  _increase() {
    this.calculated += 1;
    if (this.calculated === this.state.data.length) {
      this.setState({antsListStatus: 'All Calculated'});
      const data = this.state.data.slice();
      this.props.updateCarousel(data);
    }
  }

  _keyExtractor = (item, index) => item.name;

  renderAnts () {
    const { antsListStatus, data } = this.state;
    return (
      <View style={{ marginTop: moderateScale(10)}}>
        
        <Text style={{}}>{antsListStatus}</Text>
        
        <FlatList
          data={data}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }

  render () {
    const {loading} = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.renderAnts()}
      </View>
    );
  }
}

export default List;