/* eslint react/prefer-stateless-function: 0 */
/* eslint react/prop-types  : 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import { getPerformances } from '../../store/actions/performances';

import { Styles } from '../../assets/GeneralStyle';

class PerformancesScreen extends Component {
  componentDidMount() {
    const { onGetPerformances } = this.props;
    onGetPerformances();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={Styles.mainText}>Stages</Text>
        <Text>{JSON.stringify(this.props.getPerformancesAction)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    alignItems: 'center',
    marginTop: '20%',
  },
});

const mapStateToProps = state => {
  return {
    getPerformancesAction: state.performancesStore.getPerformancesAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPerformances: () => dispatch(getPerformances()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformancesScreen);
