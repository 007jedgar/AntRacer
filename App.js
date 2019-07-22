import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo';

import SignIn from './app/SignIn';
import Home from './app/Home';

const MainNavigator = createStackNavigator({
  SignIn: {screen: SignIn},
  Home: {screen: Home},
}, {
  initialRouteName: "SignIn"
});

const AppNavigation = createAppContainer(MainNavigator);

const client = new ApolloClient({uri: 'https://antserver-blocjgjbpw.now.sh/graphql'});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigation />
      </ApolloProvider>
    );
  }
}

export default App;