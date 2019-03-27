import React, { Component } from 'react';
/* eslint react/prefer-stateless-function: 0 */

import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Overlay } from 'react-native-maps';
import Floorplan from '../../assets/images/floorplan.jpg';

class MapScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;

    this.mapRef.setMapBoundaries(
      { latitude: 51.642318, longitude: 5.4172 },
      { latitude: 51.643618, longitude: 5.4177 }
    );

    navigation.addListener('willFocus', () => {
      this.setState({
        forceRefresh: Math.floor(Math.random() * 100),
      });
    });
  }

  render() {
    return (
      <View style={styles.floorPlanContainer}>
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
          showsUserLocation
          mapType="none"
        >
          <Overlay image={Floorplan} bounds={[[51.644861, 5.415408], [51.64074, 5.419571]]} />
        </MapView>
      </View>
    );
  }
}

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

export default MapScreen;
