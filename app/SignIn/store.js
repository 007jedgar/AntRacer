import AsyncStorage from '@react-native-community/async-storage';

class Store {

  async validateCurrentUser() {
    try {
      const value = await AsyncStorage.getItem('@currentUser')
      if (value !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async saveCurrentUser(username) {
    try {
      await AsyncStorage.setItem('@currentUser', username)
    } catch (e) {
      // saving error
    }
  }

  validateUser(username, password) {
    if (username === 'abc' && password === '123') {
      return true;
    }
    return false;
  }
}

export default Store;