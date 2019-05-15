import AsyncStorage from '@react-native-community/async-storage';
import { LocalStorageKeys } from '../../utilities/constants/constants';

import { Post, Update, Delete } from '../api/serverRequests';

import {
  ADD_USER_IS_LOADING,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_IS_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  REMOVE_USER_IS_LOADING,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAIL,
  CLEAR_ALL,
} from './actionTypes';

export const addUser = userWithoutToken => {
  return dispatch => {
    dispatch(addUserIsLoading(true));
    let user;
    AsyncStorage.getItem(LocalStorageKeys.FCM.Token).then(token => {
      user = {
        ...userWithoutToken,
        notificationToken: token,
      };

      Post('users', user)
        .then(async result => {
          if (result.status !== 200) {
            throw Error(result.statusText);
          }
          user = result.data;
          user.currentLocation = {};
          await AsyncStorage.setItem(LocalStorageKeys.User.Key, JSON.stringify(user)).then(() => {
            return user;
          });
        })
        .then(result => JSON.stringify(result))
        .then(user => dispatch(addUserSuccess(user)))
        .catch(() => dispatch(addUserFailure(true)));
    });
  };
};

export const addUserIsLoading = bool => {
  return {
    type: ADD_USER_IS_LOADING,
    payload: bool,
  };
};

export const addUserSuccess = newUser => {
  return {
    type: ADD_USER_SUCCESS,
    payload: newUser,
  };
};

export const addUserFailure = error => {
  return {
    type: ADD_USER_FAIL,
    payload: error,
  };
};

export const updateUser = user => {
  return dispatch => {
    dispatch(updateUserIsLoading(true));
    Update('users', user)
      .then(async result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        await AsyncStorage.mergeItem(LocalStorageKeys.User.Key, JSON.stringify(result.data)).then(
          () => {
            return result.data;
          }
        );
      })
      .then(result => JSON.stringify(result))
      .then(user => dispatch(updateUserSuccess(user)))
      .catch(() => dispatch(updateUserFailure(true)));
  };
};

export const updateUserIsLoading = bool => {
  return {
    type: UPDATE_USER_IS_LOADING,
    payload: bool,
  };
};

export const updateUserSuccess = newUser => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: newUser,
  };
};

export const updateUserFailure = error => {
  return {
    type: UPDATE_USER_FAIL,
    payload: error,
  };
};

export const removeUser = userId => {
  return dispatch => {
    dispatch(removeUserIsLoading(true));
    Delete(`users/${userId}`)
      .then(async result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        await AsyncStorage.clear().then(() => dispatch(removeUserSuccess()));
      })
      .then(() => dispatch(removeUserSuccess()))
      .then(() => dispatch(clearAll()))
      .catch(error => dispatch(removeUserFailure(error)));
  };
};

export const removeUserIsLoading = bool => {
  return {
    type: REMOVE_USER_IS_LOADING,
    payload: bool,
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL,
  };
};

export const removeUserSuccess = () => {
  return {
    type: REMOVE_USER_SUCCESS,
  };
};

export const removeUserFailure = error => {
  return {
    type: REMOVE_USER_FAIL,
    payload: error,
  };
};
