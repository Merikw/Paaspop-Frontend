import React, { Component } from 'react';
/* eslint react/prefer-stateless-function: 0 */

import { View, Image, StyleSheet, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Floorplan from '../../assets/images/floorplan.png';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.floorPlanContainer}>
        <ImageZoom
          style={styles.floorPlanImageZoom}
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          centerOn={{ x: 10, y: 0, scale: 2, duration: 5 }}
        >
          <Image source={Floorplan} style={styles.floorPlan} />
        </ImageZoom>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floorPlanContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  floorPlan: {
    flex: 1,
    height: 'auto',
    width: '100%',
    resizeMode: 'contain',
  },
  floorPlanImageZoom: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default MapScreen;
