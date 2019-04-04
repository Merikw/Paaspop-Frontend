import {
  GET_BESTPLACES_FAIL,
  GET_BESTPLACES_IS_LOADING,
  GET_BESTPLACES_SUCCESS,
  GENERATE_MEETING_POINT_IS_LOADING,
  GENERATE_MEETING_POINT_FAIL,
  GENERATE_MEETING_POINT_SUCCESS,
  CLEAR_MEETING_POINT,
  CLEAR_ALL,
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
  generateMeetingPointAction: {
    meetingPoint: {},
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
    case GENERATE_MEETING_POINT_IS_LOADING:
      return {
        ...state,
        generateMeetingPointAction: {
          meetingPoint: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case GENERATE_MEETING_POINT_SUCCESS:
      return {
        ...state,
        generateMeetingPointAction: {
          meetingPoint: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case GENERATE_MEETING_POINT_FAIL:
      return {
        ...state,
        generateMeetingPointAction: {
          meetingPoint: null,
          loading: false,
          error: action.payload,
          succes: false,
        },
      };
    case CLEAR_MEETING_POINT:
      return {
        ...state,
        generateMeetingPointAction: {
          meetingPoint: action.payload,
          loading: false,
          error: false,
          succes: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
