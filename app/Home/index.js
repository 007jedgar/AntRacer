import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import AntsCarousel from './Carousel';
import Logout from './Logout';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  calculate: {
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
  }
});

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Ants Racing',
      headerRight: (
        <Text
          onPress={() => {
            navigation.state.params.calculate();
          }}
          style={styles.calculate}
        >
          {'Calculate'}
        </Text>
      ),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  state = {
    data: [],
  }

  componentDidMount () {
    this.props.navigation.setParams({calculate: this._calculateAll});
  }

  _calculateAll = () => {
    this._list.calculateAll();
  };

  render () {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <List
          ref={component => this._list = component}
          updateCarousel={(data) => { this.setState({data})}} />
        <AntsCarousel data={this.state.data}/>
        <Logout navigation={navigation}/>
      </View>
    );
  }
}

export default Home;