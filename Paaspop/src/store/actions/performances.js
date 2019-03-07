import { Get } from '../api/serverRequests';

import {
  GET_PERFORMANCES_IS_LOADING,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAIL,
} from './actionTypes';

export const getPerformances = () => {
  return dispatch => {
    dispatch(getPerformancesIsLoading(true));
    Get('performances')
      .then(result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }

        return result.data;
      })
      .then(result => JSON.stringify(result))
      .then(performances => dispatch(getPerformancesSuccess(performances)))
      .catch(() => dispatch(getPerformancesFailure(true)));
  };
};

export const getPerformancesIsLoading = bool => {
  return {
    type: GET_PERFORMANCES_IS_LOADING,
    payload: bool,
  };
};

export const getPerformancesSuccess = performances => {
  return {
    type: GET_PERFORMANCES_SUCCESS,
    payload: performances,
  };
};

export const getPerformancesFailure = error => {
  return {
    type: GET_PERFORMANCES_FAIL,
    payload: error,
  };
};
