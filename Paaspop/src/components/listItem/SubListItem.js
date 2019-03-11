import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../assets/GeneralStyle';

class SubListItem extends Component {
  onPressIcon = id => () => {
    const { onPressIcon } = this.props;
    onPressIcon(id);
  };

  render() {
    const { items, favoritePerformances } = this.props;
    return (
      <View>
        {items.map(performance => {
          let date = performance.PerformanceTime.Day;
          switch (performance.PerformanceTime.Day) {
            case 5:
              date = 'Vr';
              break;
            case 6:
              date = 'Za';
              break;
            case 7:
              date = 'Zo';
              break;
          }
          return (
            <View key={performance.Id} style={styles.listItem}>
              <TouchableOpacity>
                <Text style={styles.listItemText}>{performance.Artist.Name}</Text>
                <Text style={styles.listItemSubText}>{`${date} (${
                  performance.PerformanceTime.StartTime
                } - ${performance.PerformanceTime.EndTime})`}</Text>
              </TouchableOpacity>
              <View style={styles.iconsContainer}>
                <View style={styles.iconsRight}>
                  <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={this.onPressIcon(performance.Id)}
                  >
                    <Icon
                      name={
                        favoritePerformances.findIndex(
                          p => p.id === performance.Id || p.Id === performance.Id
                        ) !== -1
                          ? 'md-heart'
                          : 'md-heart-empty'
                      }
                      size={25}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="ios-arrow-forward" size={20} color="#CACACA" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 18,
    flexDirection: 'column',
  },
  listItemSubText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Italic',
    fontSize: 15,
  },
  listItem: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '3%',
    paddingLeft: '3%',
  },
  iconsContainer: {
    justifyContent: 'center',
  },
  iconsRight: {
    paddingRight: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    marginRight: '3%',
  },
});

export default SubListItem;
