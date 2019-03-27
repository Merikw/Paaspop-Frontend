import React, { Component } from 'react';
/* eslint react/prefer-stateless-function: 0 */

import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Overlay } from 'react-native-maps';
import Floorplan from '../../assets/images/floorplan.jpg';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.floorPlanContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 51.642618,
            longitude: 5.4175,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation
          mapType="none"
          showsCompass={false}
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
