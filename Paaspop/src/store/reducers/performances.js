import {
  GET_PERFORMANCES_IS_LOADING,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAIL,
  GET_FAVORITE_PERFORMANCES_IS_LOADING,
  GET_FAVORITE_PERFORMANCES_SUCCESS,
  GET_FAVORITE_PERFORMANCES_FAIL,
  CLEAR_ALL,
} from '../actions/actionTypes';

const initialState = {
  getPerformancesAction: {
    performancesViewModel: {
      performances: [],
      suggestionPerformances: [],
    },
    error: false,
    loading: false,
    succes: false,
  },
  getFavoritePerformancesAction: {
    performances: [],
    error: false,
    loading: false,
    succes: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ALL:
      return {
        state: initialState,
      };
    case GET_PERFORMANCES_IS_LOADING:
      return {
        ...state,
        getPerformancesAction: {
          performancesViewModel: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case GET_PERFORMANCES_SUCCESS:
      return {
        ...state,
        getPerformancesAction: {
          performancesViewModel: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case GET_PERFORMANCES_FAIL:
      return {
        ...state,
        getPerformancesAction: {
          performancesViewModel: null,
          loading: false,
          error: action.payload,
          succes: false,
        },
      };
    case GET_FAVORITE_PERFORMANCES_IS_LOADING:
      return {
        ...state,
        getFavoritePerformancesAction: {
          performances: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case GET_FAVORITE_PERFORMANCES_SUCCESS:
      return {
        ...state,
        getFavoritePerformancesAction: {
          performances: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case GET_FAVORITE_PERFORMANCES_FAIL:
      return {
        ...state,
        getFavoritePerformancesAction: {
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
