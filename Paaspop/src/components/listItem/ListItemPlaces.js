import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

class ListItemPlaces extends Component {
  handleOnOpen = key => () => {
    const { onOpen } = this.props;
    onOpen(key);
  };

  render() {
    const { name, opened } = this.props;
    return (
      <TouchableOpacity style={styles.listItem} onPress={this.handleOnOpen(name)}>
        <TouchableOpacity style={styles.textLeft} onPress={this.handleOnOpen(name)}>
          <Text style={styles.listItemText}>{name}</Text>
        </TouchableOpacity>
        {opened ? (
          <View style={styles.openendContainer}>
            <View style={styles.secondColumnContainer}>
              <Text style={styles.secondColumnText}>Afstand</Text>
            </View>
            <View style={styles.thirdColumnContainer}>
              <Text style={styles.thirdColumnText}>Drukte</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity onPress={this.handleOnOpen(name)}>
          <Icon name={opened ? 'ios-arrow-down' : 'ios-arrow-forward'} size={25} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ListItemPlaces.propTypes = {
  onOpen: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  listItemText: {
    color: Colors.black,
    fontFamily: 'LiberationMono-Regular',
    fontSize: 20,
  },
  listItem: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLeft: {
    width: '80%',
  },
  openendContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondColumnContainer: {
    justifyContent: 'center',
  },
  secondColumnText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 18,
  },
  thirdColumnContainer: {
    justifyContent: 'center',
  },
  thirdColumnText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 18,
  },
});

export default ListItemPlaces;
