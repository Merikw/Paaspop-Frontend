import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, Linking, AppState } from 'react-native';
import Share from 'react-native-share';
import MapView, { Overlay, Marker } from 'react-native-maps';
import Floorplan from '../../assets/images/floorplan.png';
import { generateMeetingPoint, clearMeetingPoint } from '../../store/actions/places';
import { Colors } from '../../assets/GeneralStyle';
import customMap from '../../assets/customMap.json';
import getUser from '../../utilities/getUser/getUser';

class MapScreen extends Component {
  state = {
    appState: AppState.currentState,
    pressedShare: false,
  };

  componentDidMount() {
    const { navigation, onClearMeetingPoint } = this.props;

    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
    Linking.addEventListener('url', this.handleOpenURL);
    AppState.addEventListener('change', this.handleAppStateChange);

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

  handleAppStateChange = nextAppState => {
    const { appState } = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    }
    this.setState({ appState: nextAppState });
  };

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  navigate = url => {
    if (url !== null) {
      const { navigation } = this.props;
      const splittedroute = url.split('/');
      if (splittedroute[3] === 'meetingpoint') {
        navigation.navigate('PlaceDetail', {
          location: {
            latitude: parseFloat(splittedroute[4]),
            longitude: parseFloat(splittedroute[5]),
          },
        });
      }
    }
  };

  onPressGenerateMeetingPoint = async () => {
    const { onGenerateMeetingPoint } = this.props;
    this.setState({
      pressedShare: true,
    });
    const user = await getUser();
    if (user.currentLocation) {
      onGenerateMeetingPoint(user.currentLocation.latitude, user.currentLocation.longitude);
    }
  };

  shareMeetingPoint = async meetingPoint => {
    const { pressedShare } = this.state;
    const shareOptions = {
      message:
        'Help, ik ben je kwijt! De paaspop app heeft dit meeting punt voorgesteld, kom je hierheen?',
      url: `http://paaspopapp.nl/meetingpoint/${meetingPoint.location.latitude}/${
        meetingPoint.location.longitude
      }`,
    };

    if (pressedShare) {
      await Share.open(shareOptions);
      this.setState({
        pressedShare: false,
      });
    }
  };

  render() {
    const { generateMeetingPointAction } = this.props;
    return (
      <View style={styles.floorPlanContainer}>
        <MapView
          ref={ref => (this.mapRef = ref)}
          customMapStyle={customMap}
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
          showsMyLocationButton
          showsUserLocation
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
          <Overlay image={Floorplan} bounds={[[51.646195, 5.415526], [51.640656, 5.419507]]} />
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
