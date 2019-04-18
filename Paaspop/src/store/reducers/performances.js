import {
  GET_PERFORMANCES_IS_LOADING,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAIL,
  GET_PERFORMANCE_BY_ID_IS_LOADING,
  GET_PERFORMANCE_BY_ID_SUCCESS,
  GET_PERFORMANCE_BY_ID_FAIL,
  GET_FAVORITE_PERFORMANCES_IS_LOADING,
  GET_FAVORITE_PERFORMANCES_SUCCESS,
  GET_FAVORITE_PERFORMANCES_FAIL,
  SEARCH_PERFORMANCES_SUCCESS,
  CLEAR_ALL,
} from '../actions/actionTypes';

const initialState = {
  getPerformancesAction: {
    performancesViewModel: {
      performances: [],
      suggestionPerformances: [],
    },
    allPerformances: [],
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
  getPerformanceByIdAction: {
    performance: {},
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
          allPerformances: action.payload,
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
    case GET_PERFORMANCE_BY_ID_IS_LOADING:
      return {
        ...state,
        getPerformanceByIdAction: {
          performance: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case GET_PERFORMANCE_BY_ID_SUCCESS:
      return {
        ...state,
        getPerformanceByIdAction: {
          performance: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case GET_PERFORMANCE_BY_ID_FAIL:
      return {
        ...state,
        getPerformanceByIdAction: {
          performance: null,
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
    case SEARCH_PERFORMANCES_SUCCESS:
      return {
        ...state,
        getPerformancesAction: {
          performancesViewModel: action.payload.newPerformancesViewModel,
          allPerformances: action.payload.allPerformances,
          loading: false,
          error: false,
          succes: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
