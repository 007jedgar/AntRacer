import React from 'react';
import {
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Spinner
} from '../common'
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  ScaledSheet
} from 'react-native-size-matters'

import Store from './store';
import { Block } from '../common/Block';

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
      this.navigateToHome();
    } else {
      this.setState({ loading: false });
    }
  }

  onSignInClick = () => {
    const { username, password } = this.state;
    const isUserValidated = this.store.validateUser(username, password);
    if (isUserValidated) {
      this.store.saveCurrentUser(username);
      this.navigateToHome();
    } else {
      this.showAlert();
    }
  }

  navigateToHome () {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  showAlert () {
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

  renderSignin() {
    const { btnStyle, signInText } = styles
    if (this.state.loading) {
      return (
        <Spinner color="#fff"/>
      )
    } else {
      return (
        <TouchableOpacity style={btnStyle} onPress={this.onSignInClick}>
          <Text style={signInText}>
            Sign In
          </Text>
        </TouchableOpacity>
      )
    }
  }

  render () {
    const { username, password } = this.state;

    return (
      <Block style={{backgroundColor: '#bec5ad', }}>
        <KeyboardAwareScrollView contentContainerStyle={{justifyContent: 'center'}}>
          <View style={styles.container}>
            <Text style={styles.title}>{'ANT RACER'}</Text>

            <TextInput
              autoCapitalize={'none'}
              style={styles.textInput}
              onChangeText={this.onUsernameChangeText}
              value={username}
              placeholder={'username'} 
            />

            <TextInput
              autoCapitalize={'none'}
              style={styles.textInput}
              value={password}
              placeholder={'password'}
              secureTextEntry={true}
              onChangeText={this.onPasswordChangeText}
            />
            
            {this.renderSignin()}

          </View>
        </KeyboardAwareScrollView>
      </Block>
    );
  }
}

export default SignIn;

const styles = ScaledSheet.create({
  container: {
    marginTop: '30%',
    alignSelf: 'center',
  },
  textInput: {
    paddingLeft: 10,
    height: '40@ms',
    width: '260@ms',
    marginBottom: 20,
    borderColor: 'gray',
    borderRadius: '4@ms',
    backgroundColor: 'white',
    borderBottomWidth: '3@ms',
    alignSelf: 'center',
    fontSize: '23@ms',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: '30@ms',
    color: 'white',
    textAlign: 'center',
    margin: '10@ms',
  },
  text: {
    color: 'white',
    fontSize: 14
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: '24@ms',
    color: '#676767',
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: '3@ms',
    borderRadius: '4@ms',
    borderColor: '#676767',
    alignSelf: 'center',
    width: '150@ms',
    height: '40@ms',
    justifyContent: 'center',
  },
})