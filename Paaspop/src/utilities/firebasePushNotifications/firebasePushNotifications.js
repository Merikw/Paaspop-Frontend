import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { LocalStorageKeys } from '../constants/constants';

const setNotificationListener = () => {
  this.notificationListener = firebase.notifications().onNotification(notification => {
    Alert.alert(notification.title, notification.body, [{ text: 'OK' }], { cancelable: false });
  });

  const channel = new firebase.notifications.Android.Channel(
    'default',
    'Default Channel',
    firebase.notifications.Android.Importance.Max
  ).setDescription('The default notification channel.');

  firebase.notifications().android.createChannel(channel);
};

const setFirebase = async () => {
  const messaging = firebase.messaging();

  messaging
    .hasPermission()
    .then(async enabled => {
      if (enabled) {
        setNotificationListener();
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
            setFirebase();
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

export default setFirebase;
