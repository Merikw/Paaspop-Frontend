import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

const SubListItem = props => {
  const { items, maxPercentage } = props;
  return (
    <View>
      {items.map(bestPlace => {
        const place = bestPlace.Place;
        return (
          <View key={place.Id} style={styles.listItem}>
            <TouchableOpacity style={styles.listItemTextContainer}>
              <Text style={styles.listItemText}>{place.Name}</Text>
            </TouchableOpacity>
            <View style={styles.secondListItemTextContainer}>
              <Text style={styles.listItemText}>{`${bestPlace.Distance.AbsoluteDistance}M`}</Text>
            </View>
            <View style={styles.crowdBarContainer}>
              <View style={styles.crowdBar}>
                <View
                  style={[
                    {
                      width: `${(place.CrowdPercentage.AbsolutePercentage / maxPercentage) * 100}%`,
                    },
                    styles.filler,
                  ]}
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

SubListItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  maxPercentage: PropTypes.number,
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
    maxHeight: 30,
    height: '15%',
    width: '100%',
    backgroundColor: Colors.gray,
  },
  crowdBarContainer: {
    width: '30%',
    justifyContent: 'center',
    paddingRight: '2%',
  },
  filler: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});

export default SubListItem;
