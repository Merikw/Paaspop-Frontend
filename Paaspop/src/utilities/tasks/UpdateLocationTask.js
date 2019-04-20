import BackgroundTimer from 'react-native-background-timer';

import getUser from '../getUser/getUser';

const UpdateLocationTask = (updateUserFunc, navigator) => {
  BackgroundTimer.runBackgroundTimer(async () => {
    const response = await getUser();
    if (response) {
      let newLocationUser = response;
      navigator.geolocation.getCurrentPosition(
        position => {
          if (position) {
            newLocationUser = {
              ...newLocationUser,
              currentLocation: {
                latitude: JSON.stringify(position.coords.latitude),
                longitude: JSON.stringify(position.coords.longitude),
              },
              userUpdateType: 0,
            };
            updateUserFunc(newLocationUser);
          }
        },
        err => {},
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  }, 5000);
};

export default UpdateLocationTask;
