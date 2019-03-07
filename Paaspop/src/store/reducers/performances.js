import {
  GET_PERFORMANCES_IS_LOADING,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAIL,
} from '../actions/actionTypes';

const initialState = {
  getPerformancesAction: {
    performances: {},
    error: false,
    loading: false,
    succes: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERFORMANCES_IS_LOADING:
      return {
        ...state,
        getPerformancesAction: {
          performances: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case GET_PERFORMANCES_SUCCESS:
      return {
        ...state,
        getPerformancesAction: {
          performances: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case GET_PERFORMANCES_FAIL:
      return {
        ...state,
        getPerformancesAction: {
          performances: null,
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
