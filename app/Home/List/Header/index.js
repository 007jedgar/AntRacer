import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = () =>(
  <View style={styles.container}>
    <Text style={styles.name}>{'name'}</Text>
    <Text style={styles.state}>{'state'}</Text>
    <Text style={styles.odds}>{'odds'}</Text>
  </View>
)

export default Header;


const styles = StyleSheet.create({
  container: { flexDirection: 'row', margin: 5 },
  name: { width: 100, maxWidth: 100, marginRight: 25, fontWeight: 'bold' },
  state: { width: 90, marginRight: 40, fontWeight: 'bold' },
  odds: { marginRight: 40, fontWeight: 'bold' },
});