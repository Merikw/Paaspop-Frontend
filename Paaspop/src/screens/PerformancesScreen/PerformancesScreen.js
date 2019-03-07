import React, { Component } from 'react';
/* eslint react/prefer-stateless-function: 0 */

import { View, Text, StyleSheet } from 'react-native';
import { Styles } from '../../assets/GeneralStyle';

class PerformancesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={Styles.mainText}>Stages</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default PerformancesScreen;
