import { Get } from '../api/serverRequests';

import {
  GET_BESTPLACES_FAIL,
  GET_BESTPLACES_IS_LOADING,
  GET_BESTPLACES_SUCCESS,
  GENERATE_MEETING_POINT_IS_LOADING,
  GENERATE_MEETING_POINT_FAIL,
  GENERATE_MEETING_POINT_SUCCESS,
  CLEAR_MEETING_POINT,
} from './actionTypes';

export const getBestPlaces = (lat, lon) => {
  const latitude = lat ? lat : 51.619991;
  const longitude = lon ? lon : 5.43434;
  return async dispatch => {
    dispatch(getBestPlacesIsLoading(true));
    Get(`places/best/${latitude}/${longitude}`)
      .then(result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        return result.data;
      })
      .then(bestPlaces => dispatch(getBestPlacesSuccess(bestPlaces)))
      .catch(() => dispatch(getBestPlacesFailure(true)));
  };
};

export const getBestPlacesIsLoading = bool => {
  return {
    type: GET_BESTPLACES_IS_LOADING,
    payload: bool,
  };
};

export const getBestPlacesSuccess = bestPlaces => {
  return {
    type: GET_BESTPLACES_SUCCESS,
    payload: bestPlaces,
  };
};

export const getBestPlacesFailure = error => {
  return {
    type: GET_BESTPLACES_FAIL,
    payload: error,
  };
};

export const generateMeetingPoint = (lat, lon) => {
  const latitude = lat ? lat : 51.619991;
  const longitude = lon ? lon : 5.43434;
  return async dispatch => {
    dispatch(generateMeetingPointIsLoading(true));
    Get(`places/generateMeetingPoint/${latitude}/${longitude}`)
      .then(result => {
        if (result.status !== 200) {
          throw Error(result.statusText);
        }
        return result.data;
      })
      .then(meetingPoint => dispatch(generateMeetingPointSuccess(meetingPoint)))
      .catch(() => dispatch(generateMeetingPointFailure(true)));
  };
};

export const generateMeetingPointIsLoading = bool => {
  return {
    type: GENERATE_MEETING_POINT_IS_LOADING,
    payload: bool,
  };
};

export const generateMeetingPointSuccess = meetingPoint => {
  return {
    type: GENERATE_MEETING_POINT_SUCCESS,
    payload: meetingPoint,
  };
};

export const generateMeetingPointFailure = error => {
  return {
    type: GENERATE_MEETING_POINT_FAIL,
    payload: error,
  };
};

export const clearMeetingPoint = () => {
  return {
    type: CLEAR_MEETING_POINT,
    payload: null,
  };
};
