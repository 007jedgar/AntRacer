import React from 'react';
import { Text, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  text: {
    color: 'blue',
    marginTop: 10,
  }
});

class Logout extends React.PureComponent {

    _signOut = async () => {
      AsyncStorage.removeItem('@currentUser', (error) => {
        if (error) {
          this._showErrorAlert();
        }
      }).then(() => {
        this._navigateToSignIn();
      });
    }

    _showErrorAlert () {
      Alert.alert(
        'Error',
        'something went wrong please try again',
        [
          {text: 'OK', onPress: () => {}},
        ],
        {cancelable: false},
      );
    }

    _navigateToSignIn = () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    render () {
      return (
        <Text
          style={styles.text}
          onPress={this._signOut}>
          {'Log Out'}
        </Text>
      )
    }
}

export default Logout;