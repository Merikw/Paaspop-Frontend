import AsyncStorage from '@react-native-community/async-storage';
import { LocalStorageKeys } from '../constants/constants';

const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem(LocalStorageKeys.User.Key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    alert('Kan de gebruiker niet ophalen, start de app opnieuw op.');
  }
};

export default getUser;
