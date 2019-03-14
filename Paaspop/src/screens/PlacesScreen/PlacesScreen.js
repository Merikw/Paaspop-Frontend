import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Loader from '../../components/loader/Loader';
import { getBestPlaces } from '../../store/actions/places';
import { Styles } from '../../assets/GeneralStyle';
import ListItemPlaces from '../../components/listItem/ListItemPlaces';
import SubListItemPlaces from '../../components/listItem/SubListItemPlaces';
import getUser from '../../utilities/getUser/getUser';

class PlacesScreen extends Component {
  state = {
    openendPlaces: [],
    user: {},
  };

  async componentDidMount() {
    const { onGetBestPlaces } = this.props;
    const response = await getUser();
    if (response) {
      this.setState({
        user: response,
      });
    }
    onGetBestPlaces(response.currentLocation.latitude, response.currentLocation.longitude);
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

  renderListItems = item => {
    const { openendPlaces } = this.state;
    const isOpened = openendPlaces.indexOf(item.Key) !== -1;
    return (
      <View key={item.Key} style={styles.listItemContainer}>
        <ListItemPlaces name={item.Key} onOpen={this.onOpenPlaceHandler} opened={isOpened} />
        {isOpened ? (
          <SubListItemPlaces maxPercentage={item.MaxPercentage} items={item.Value} />
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
            getBestPlacesAction.bestPlaces.map(item => {
              return this.renderListItems(item);
            })
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
