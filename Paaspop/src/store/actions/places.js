import { Get } from '../api/serverRequests';

import {
  GET_BESTPLACES_FAIL,
  GET_BESTPLACES_IS_LOADING,
  GET_BESTPLACES_SUCCESS,
} from './actionTypes';

export const getBestPlaces = (lat, lon) => {
  const latitude = lat ? lat : 51.619991;
  const longitude = lon ? lon : 5.43434;
  return dispatch => {
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
