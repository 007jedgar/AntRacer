import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Text
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Store from './store';

class SignIn extends React.PureComponent {

  static navigationOptions = {
    header: null,
  };

  state = {
    username: 'abc',
    password: '123',
    loading: true,
  }

  store = new Store();

  componentDidMount() {
    this.validateCurrentUser();
  }

  async validateCurrentUser () {
    const value = await this.store.validateCurrentUser();
    if (value) {
      this._navigateToHome();
    } else {
      this.setState({ loading: false });
    }
  }

  _onSignInClick = () => {
    const { username, password } = this.state;
    const isUserValidated = this.store.validateUser(username, password);
    if (isUserValidated) {
      this.store.saveCurrentUser(username);
      this._navigateToHome();
    } else {
      this._showAlert();
    }
  }

  _navigateToHome () {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _showAlert () {
    Alert.alert(
      'Sign In',
      `Password is incorrect`,
      [
        {text: 'OK', onPress: () => {this.setState({username: '', password: ''})}},
      ],
      {cancelable: false},
    );
  }

  onUsernameChangeText = (text) => this.setState({ username: text });

  onPasswordChangeText = (text) => this.setState({ password: text });

  render () {
    const { username, password, loading } = this.state;

    if (loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      )
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.title}>{'Ants Racing'}</Text>
        <TextInput
          autoCapitalize={'none'}
          style={styles.textInput}
          onChangeText={this.onUsernameChangeText}
          value={username}
          placeholder={'username'} />
        <TextInput
          autoCapitalize={'none'}
          style={styles.textInput}
          value={password}
          placeholder={'password'}
          secureTextEntry={true}
          onChangeText={this.onPasswordChangeText}/>
        <Text
          onPress={this._onSignInClick}
          style={styles.text}
        >
          {'Sign In'}
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4511e',
  },
  textInput: {
    paddingLeft: 10,
    height: 40,
    width: 150,
    marginBottom: 20,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 50,
  },
  text: {
    color: 'white',
    fontSize: 14
  }
});