import { Get } from '../api/serverRequests';

import {
  GET_PERFORMANCES_IS_LOADING,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAIL,
  GET_FAVORITE_PERFORMANCES_IS_LOADING,
  GET_FAVORITE_PERFORMANCES_SUCCESS,
  GET_FAVORITE_PERFORMANCES_FAIL,
  GET_PERFORMANCE_BY_ID_IS_LOADING,
  GET_PERFORMANCE_BY_ID_SUCCESS,
  GET_PERFORMANCE_BY_ID_FAIL,
} from './actionTypes';

export const getPerformances = userId => {
  return dispatch => {
    dispatch(getPerformancesIsLoading(true));
    Get(`performances/${userId}`)
      .then(result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        return result.data;
      })
      .then(performancesViewModel => dispatch(getPerformancesSuccess(performancesViewModel)))
      .catch(() => dispatch(getPerformancesFailure(true)));
  };
};

export const getPerformancesIsLoading = bool => {
  return {
    type: GET_PERFORMANCES_IS_LOADING,
    payload: bool,
  };
};

export const getPerformancesSuccess = performancesViewModel => {
  return {
    type: GET_PERFORMANCES_SUCCESS,
    payload: performancesViewModel,
  };
};

export const getPerformancesFailure = error => {
  return {
    type: GET_PERFORMANCES_FAIL,
    payload: error,
  };
};

export const getPerformanceById = performanceId => {
  return dispatch => {
    dispatch(getPerformanceByIdIsLoading(true));
    Get(`performances/byid/${performanceId}`)
      .then(result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        return result.data;
      })
      .then(performancesViewModel => dispatch(getPerformanceByIdSuccess(performancesViewModel)))
      .catch(() => dispatch(getPerformanceByIdFailure(true)));
  };
};

export const getPerformanceByIdIsLoading = bool => {
  return {
    type: GET_PERFORMANCE_BY_ID_IS_LOADING,
    payload: bool,
  };
};

export const getPerformanceByIdSuccess = performancesViewModel => {
  return {
    type: GET_PERFORMANCE_BY_ID_SUCCESS,
    payload: performancesViewModel,
  };
};

export const getPerformanceByIdFailure = error => {
  return {
    type: GET_PERFORMANCE_BY_ID_FAIL,
    payload: error,
  };
};

export const getFavoritePerformances = userId => {
  return dispatch => {
    dispatch(getFavoritePerformancesIsLoading(true));
    Get(`users/favoritePerformances/${userId}`)
      .then(result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        return result.data;
      })
      .then(performances => dispatch(getFavoritePerformancesSucces(performances)))
      .catch(() => dispatch(getFavoritePerformancesFailure(true)));
  };
};

export const getFavoritePerformancesIsLoading = bool => {
  return {
    type: GET_FAVORITE_PERFORMANCES_IS_LOADING,
    payload: bool,
  };
};

export const getFavoritePerformancesSucces = performances => {
  return {
    type: GET_FAVORITE_PERFORMANCES_SUCCESS,
    payload: performances,
  };
};

export const getFavoritePerformancesFailure = error => {
  return {
    type: GET_FAVORITE_PERFORMANCES_FAIL,
    payload: error,
  };
};
