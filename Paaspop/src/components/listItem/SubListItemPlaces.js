import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

class SubListItem extends Component {
  onPressPlace = place => () => {
    const { onPressPlace } = this.props;
    onPressPlace(place);
  };

  render() {
    const { items, maxPercentage } = this.props;
    return (
      <View>
        {items.map(bestPlace => {
          const place = bestPlace.place;
          return (
            <TouchableOpacity
              onPress={this.onPressPlace(place)}
              key={place.id}
              style={styles.listItem}
            >
              <TouchableOpacity
                style={styles.listItemTextContainer}
                onPress={this.onPressPlace(place)}
              >
                <Text style={styles.listItemText}>{place.name}</Text>
              </TouchableOpacity>
              <View style={styles.secondListItemTextContainer}>
                <Text style={styles.listItemText}>{`${bestPlace.distance.absoluteDistance}M`}</Text>
              </View>
              <View style={styles.centercontainer}>
                <View style={styles.crowdBarContainer}>
                  <View style={styles.crowdBar}>
                    <View
                      style={[
                        {
                          width: `${
                            maxPercentage > 0
                              ? (place.crowdPercentage.absolutePercentage / maxPercentage) * 100
                              : 0
                          }%`,
                        },
                        styles.filler,
                      ]}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

SubListItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  maxPercentage: PropTypes.number,
  onPressPlace: PropTypes.func.isRequired,
};

SubListItem.defaultProps = {
  items: [{}],
  maxPercentage: 1,
};

const styles = StyleSheet.create({
  listItemText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 16,
  },
  listItemTextContainer: {
    width: '40%',
    justifyContent: 'center',
  },
  secondListItemTextContainer: {
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '3%',
    paddingLeft: '2%',
  },
  crowdBar: {
    width: '100%',
    backgroundColor: Colors.gray,
  },
  crowdBarContainer: {
    height: 4,
    width: '100%',
    justifyContent: 'center',
    paddingRight: '2%',
  },
  filler: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  centercontainer: {
    justifyContent: 'center',
    width: '30%',
  },
});

export default SubListItem;
