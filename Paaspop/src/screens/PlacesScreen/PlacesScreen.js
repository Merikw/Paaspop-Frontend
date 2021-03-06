import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import Loader from '../../components/loader/Loader';
import { getBestPlaces } from '../../store/actions/places';
import { Styles } from '../../assets/GeneralStyle';
import ListItemPlaces from '../../components/listItem/ListItemPlaces';
import SubListItemPlaces from '../../components/listItem/SubListItemPlaces';
import getUser from '../../utilities/getUser/getUser';

class PlacesScreen extends Component {
  state = {
    openendPlaces: [],
  };

  async componentDidMount() {
    const { navigation, onGetBestPlaces } = this.props;
    const response = await getUser();
    if (response) {
      onGetBestPlaces(response.currentLocation.latitude, response.currentLocation.longitude);
      navigation.addListener('willFocus', async () => {
        const response = await getUser();
        if (response) {
          onGetBestPlaces(response.currentLocation.latitude, response.currentLocation.longitude);
        }
      });
    }
  }

  onOpenPlaceHandler = key => {
    const { openendPlaces } = this.state;
    const newOpenendPlaces = openendPlaces;
    openendPlaces.includes(key)
      ? newOpenendPlaces.splice(newOpenendPlaces.indexOf(key), 1)
      : newOpenendPlaces.push(key),
      this.setState(prevstate => ({
        ...prevstate,
        openendPlaces: newOpenendPlaces,
      }));
  };

  pressPlace = place => {
    const { navigation } = this.props;
    navigation.navigate('PlaceDetail', { location: place.location });
  };

  renderListItems = (item, maxPercentage) => {
    const { openendPlaces } = this.state;
    const isOpened = openendPlaces.indexOf(item.key) !== -1;
    return (
      <View key={item.key} style={styles.listItemContainer}>
        <ListItemPlaces name={item.key} onOpen={this.onOpenPlaceHandler} opened={isOpened} />
        {isOpened ? (
          <SubListItemPlaces
            maxPercentage={maxPercentage}
            items={item.value}
            onPressPlace={this.pressPlace}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  render() {
    const { getBestPlacesAction } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader isLoading={getBestPlacesAction.loading ? getBestPlacesAction.loading : false} />
          <Text style={Styles.mainText}>Plekken</Text>
        </View>
        <ScrollView>
          {getBestPlacesAction.bestPlaces ? (
            getBestPlacesAction.bestPlaces.bestPlaces.map(item => {
              return this.renderListItems(item, getBestPlacesAction.bestPlaces.maxPercentage);
            })
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    );
  }
}

PlacesScreen.propTypes = {
  getBestPlacesAction: PropTypes.shape(
    PropTypes.shape(PropTypes.arrayOf, PropTypes.number),
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  onGetBestPlaces: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

PlacesScreen.defaultProps = {
  getBestPlacesAction: {
    bestPlaces: {
      bestPlaces: [],
      maxPercentage: 1,
    },
    error: false,
    loading: false,
    succes: false,
  },
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    marginTop: '20%',
    marginLeft: '3%',
    marginRight: '5%',
  },
  innerContainer: {
    alignItems: 'center',
  },
  listItemContainer: {
    flexDirection: 'column',
    paddingBottom: 15,
  },
});

const mapStateToProps = state => {
  return {
    getBestPlacesAction: state.placesStore.getBestPlacesAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBestPlaces: (lat, lon) => dispatch(getBestPlaces(lat, lon)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesScreen);
