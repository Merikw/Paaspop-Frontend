import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Share from 'react-native-share';
import MapView, { PROVIDER_GOOGLE, Overlay, Marker } from 'react-native-maps';
import Floorplan from '../../assets/images/floorplan.jpg';
import { generateMeetingPoint, clearMeetingPoint } from '../../store/actions/places';
import { Colors } from '../../assets/GeneralStyle';
import getUser from '../../utilities/getUser/getUser';

class MapScreen extends Component {
  componentDidMount() {
    const { navigation, onClearMeetingPoint } = this.props;

    this.mapRef.setMapBoundaries(
      { latitude: 51.642318, longitude: 5.4172 },
      { latitude: 51.643618, longitude: 5.4177 }
    );

    navigation.addListener('willFocus', () => {
      this.setState({
        forceRefresh: Math.floor(Math.random() * 100),
      });
    });
    navigation.addListener('willBlur', () => {
      onClearMeetingPoint();
    });
  }

  async componentDidUpdate() {
    const { generateMeetingPointAction } = this.props;
    if (generateMeetingPointAction.succes) {
      await this.shareMeetingPoint(generateMeetingPointAction.meetingPoint);
    }
  }

  onPressGenerateMeetingPoint = async () => {
    const { onGenerateMeetingPoint } = this.props;
    const user = await getUser();
    if (user.currentLocation) {
      onGenerateMeetingPoint(user.currentLocation.latitude, user.currentLocation.longitude);
    }
  };

  shareMeetingPoint = async meetingPoint => {
    const shareOptions = {
      message:
        'Help, ik ben je kwijt! De paaspop app heeft dit meeting punt voorgesteld, kom je hierheen?',
      url: `http://paaspopapp.nl/meetingpoint/${meetingPoint.location.latitude}/${
        meetingPoint.location.longitude
      }`,
    };

    Share.open(shareOptions);
  };

  render() {
    const { generateMeetingPointAction } = this.props;
    return (
      <View style={styles.floorPlanContainer}>
        <MapView
          ref={ref => (this.mapRef = ref)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: generateMeetingPointAction.succes
              ? generateMeetingPointAction.meetingPoint.location.latitude
              : 51.642618,
            longitude: generateMeetingPointAction.succes
              ? generateMeetingPointAction.meetingPoint.location.longitude
              : 5.4175,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          minZoomLevel={17.3}
          showsMyLocationButton={false}
          showsUserLocation
          mapType="none"
        >
          {generateMeetingPointAction.succes ? (
            <Marker
              title="Gegenereerd meeting punt"
              coordinate={{
                latitude: generateMeetingPointAction.meetingPoint.location.latitude,
                longitude: generateMeetingPointAction.meetingPoint.location.longitude,
              }}
              pinColor={Colors.primary}
            />
          ) : (
            <View />
          )}
          <Overlay image={Floorplan} bounds={[[51.644861, 5.415408], [51.64074, 5.419571]]} />
        </MapView>
        <TouchableOpacity
          style={styles.meetingPointButton}
          onPress={this.onPressGenerateMeetingPoint}
        >
          <Text style={styles.meetingPointButtonText}>Meeting</Text>
          <Text style={styles.meetingPointButtonText}>punt</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onGenerateMeetingPoint: PropTypes.func.isRequired,
  generateMeetingPointAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  onClearMeetingPoint: PropTypes.func.isRequired,
};

MapScreen.defaultProps = {
  generateMeetingPointAction: { performances: [], error: false, loading: false, succes: false },
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
  meetingPointButton: {
    borderRadius: 100,
    backgroundColor: Colors.primary,
    padding: 10,
    width: 70,
    height: 70,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    alignSelf: 'flex-end',
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
  meetingPointButtonText: {
    fontFamily: 'LiberationSans-Regular',
    fontSize: 12,
    color: Colors.white,
  },
});

const mapStateToProps = state => {
  return {
    generateMeetingPointAction: state.placesStore.generateMeetingPointAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGenerateMeetingPoint: (lat, lon) => dispatch(generateMeetingPoint(lat, lon)),
    onClearMeetingPoint: () => dispatch(clearMeetingPoint()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
