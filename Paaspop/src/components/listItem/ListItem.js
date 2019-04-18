import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

class ListItem extends Component {
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
        <TouchableOpacity onPress={this.handleOnOpen(name)}>
          <Icon name={opened ? 'ios-arrow-down' : 'ios-arrow-forward'} size={25} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ListItem.propTypes = {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListItem;
