import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Overlay, Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

import Floorplan from '../../assets/images/floorplan.jpg';
import Loader from '../../components/loader/Loader';
import { Colors } from '../../assets/GeneralStyle';

class PlaceDetailScreen extends Component {
  state = {
    place: {},
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      place: navigation.getParam('place', {}),
    });
  }

  render() {
    const { place } = this.state;
    return (
      <View style={styles.floorPlanContainer}>
        {!place.location ? (
          <View style={styles.innerContainer}>
            <Loader isLoading={place.location ? true : false} />
          </View>
        ) : (
          <MapView
            ref={ref => (this.mapRef = ref)}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 51.642618,
              longitude: 5.4175,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            minZoomLevel={17.3}
            showsMyLocationButton={false}
            showsUserLocation
            mapType="none"
          >
            <Marker
              coordinate={{
                latitude: place.location.latitude,
                longitude: place.location.longitude,
              }}
              title={place.name}
              pinColor={Colors.primary}
            />
            <Overlay image={Floorplan} bounds={[[51.644861, 5.415408], [51.64074, 5.419571]]} />
          </MapView>
        )}
      </View>
    );
  }
}

PlaceDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  floorPlanContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PlaceDetailScreen;
