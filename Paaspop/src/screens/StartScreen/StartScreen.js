/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class StartScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartScreen;
