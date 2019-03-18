import { AsyncStorage } from 'react-native';
import { LocalStorageKeys } from '../../utilities/constants/constants';

import { Post, Update } from '../api/serverRequests';

import {
  ADD_USER_IS_LOADING,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_IS_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from './actionTypes';

export const addUser = user => {
  return dispatch => {
    dispatch(addUserIsLoading(true));
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
      .catch();
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