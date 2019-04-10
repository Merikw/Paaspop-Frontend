import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

class SubListItem extends Component {
  onPressIcon = id => () => {
    const { onPressIcon } = this.props;
    onPressIcon(id);
  };

  onPressPerformance = performance => () => {
    const { onPressPerformance } = this.props;
    onPressPerformance(performance);
  };

  render() {
    const {
      items,
      favoritePerformances,
      favoriteIcon,
      showStage,
      suggestions,
      isSuggestionStage,
    } = this.props;
    return (
      <View>
        {items.map(performance => {
          let date = performance.performanceTime ? performance.performanceTime.day : '';
          if (date !== '') {
            switch (performance.performanceTime.day) {
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
          }
          return (
            <View key={performance.id} style={styles.listItem}>
              <TouchableOpacity
                style={styles.listItemClickable}
                onPress={this.onPressPerformance(performance)}
              >
                <Text style={styles.listItemText}>{performance.artist.name}</Text>
                <Text style={styles.listItemSubText}>{`${date} (${
                  performance.performanceTime ? performance.performanceTime.startTime : ''
                } - ${performance.performanceTime ? performance.performanceTime.endTime : ''}) ${
                  showStage ? `- ${performance.stage.name}` : ''
                } ${
                  suggestions.findIndex(p => p.id === performance.id) !== -1 && !isSuggestionStage
                    ? `- Voorgesteld voor jou!`
                    : ''
                }`}</Text>
              </TouchableOpacity>
              <View style={styles.iconsContainer}>
                <View style={styles.iconsRight}>
                  <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={this.onPressIcon(performance.id)}
                  >
                    {favoriteIcon ? (
                      <Icon
                        name={
                          favoritePerformances.findIndex(p => p.id === performance.id) !== -1
                            ? 'md-heart'
                            : 'md-heart-empty'
                        }
                        size={25}
                        color={Colors.primary}
                      />
                    ) : (
                      <View />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPressPerformance(performance)}>
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

SubListItem.propTypes = {
  onPressIcon: PropTypes.func.isRequired,
  onPressPerformance: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  favoritePerformances: PropTypes.arrayOf(PropTypes.object),
  favoriteIcon: PropTypes.bool,
  showStage: PropTypes.bool,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  isSuggestionStage: PropTypes.bool,
};

SubListItem.defaultProps = {
  items: [{}],
  favoritePerformances: [{}],
  favoriteIcon: false,
  showStage: false,
  isSuggestionStage: false,
  suggestions: [{}],
};

const styles = StyleSheet.create({
  listItemText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 16,
    flexDirection: 'column',
  },
  listItemSubText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Italic',
    fontSize: 15,
  },
  listItemClickable: {
    maxWidth: '85%',
  },
  listItem: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '2%',
    paddingBottom: '2%',
  },
  iconsContainer: {
    justifyContent: 'center',
  },
  iconsRight: {
    paddingRight: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    marginRight: '3%',
  },
});

export default SubListItem;
