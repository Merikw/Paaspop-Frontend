import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { LocalStorageKeys } from '../constants/constants';

const getToken = async () => {
  const messaging = firebase.messaging();
  messaging
    .hasPermission()
    .then(async enabled => {
      if (enabled) {
        alert('komt die hier?');
        AsyncStorage.getItem(LocalStorageKeys.FCM.Token).then(value => {
          if (!value) {
            messaging
              .getToken()
              .then(async token => {
                await AsyncStorage.setItem(LocalStorageKeys.FCM.Token, token).then(() => {
                  return true;
                });
              })
              .catch(() => {
                alert('Er is een fout opgetreden, je zult geen push berichten ontvangen!');
                return false;
              });
          } else {
            return true;
          }
        });
      } else {
        messaging
          .requestPermission()
          .then(() => {
            getToken();
          })
          .catch(() => {
            alert('Er is een fout opgetreden, je zult geen push berichten ontvangen!');
            return false;
          });
      }
    })
    .catch(() => {
      alert('Er is een fout opgetreden, je zult geen push berichten ontvangen!');
    });
};

export default getToken;
