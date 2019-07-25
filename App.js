import React, {Component} from 'react';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen'
import Router from './app/Router'


const client = new ApolloClient({uri: 'https://antserver-blocjgjbpw.now.sh/graphql'});

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    );
  }
}

export default App;