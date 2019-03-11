import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../assets/GeneralStyle';

class ListItem extends Component {
  handleOnOpen = key => () => {
    const { onOpen } = this.props;
    onOpen(key);
  };

  render() {
    const { item, opened } = this.props;
    const key = item.Key;
    return (
      <View style={styles.listItem}>
        <TouchableOpacity style={styles.textLeft} onPress={this.handleOnOpen(key)}>
          <Text style={styles.listItemText}>{key}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleOnOpen(key)}>
          <Icon name={opened ? 'ios-arrow-down' : 'ios-arrow-forward'} size={25} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

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
});

export default ListItem;
