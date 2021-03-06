import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Overlay, Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

import Floorplan from '../../assets/images/floorplan.png';
import Loader from '../../components/loader/Loader';
import { Colors } from '../../assets/GeneralStyle';

class PlaceDetailScreen extends Component {
  state = {
    location: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      location: navigation.getParam('location', {}),
    });
  }

  render() {
    const { location } = this.state;
    return (
      <View style={styles.floorPlanContainer}>
        {!location ? (
          <View style={styles.innerContainer}>
            <Loader isLoading={location ? true : false} />
          </View>
        ) : (
          <MapView
            ref={ref => (this.mapRef = ref)}
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
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
                latitude: location.latitude,
                longitude: location.longitude,
              }}
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
