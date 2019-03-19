import {
  GET_BESTPLACES_FAIL,
  GET_BESTPLACES_IS_LOADING,
  GET_BESTPLACES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  getBestPlacesAction: {
    bestPlaces: {
      bestPlaces: [],
      maxPercentage: 1,
    },
    error: false,
    loading: false,
    succes: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BESTPLACES_IS_LOADING:
      return {
        ...state,
        getBestPlacesAction: {
          bestPlaces: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case GET_BESTPLACES_SUCCESS:
      return {
        ...state,
        getBestPlacesAction: {
          bestPlaces: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case GET_BESTPLACES_FAIL:
      return {
        ...state,
        getBestPlacesAction: {
          bestPlaces: null,
          loading: false,
          error: action.payload,
          succes: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
