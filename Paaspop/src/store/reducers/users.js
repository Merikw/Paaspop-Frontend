import {
  ADD_USER_IS_LOADING,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_IS_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../actions/actionTypes';

const initialState = {
  addUserAction: {
    newUser: {},
    error: false,
    loading: false,
    succes: false,
  },

  updateUserAction: {
    updateUser: {},
    error: false,
    loading: false,
    succes: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_IS_LOADING:
      return {
        ...state,
        addUserAction: { newUser: null, loading: action.payload, error: false, succes: false },
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        addUserAction: { newUser: action.payload, loading: false, error: false, succes: true },
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        addUserAction: { newUser: null, loading: false, error: action.payload, succes: false },
      };
    case UPDATE_USER_IS_LOADING:
      return {
        ...state,
        updateUserAction: {
          updateUser: null,
          loading: action.payload,
          error: false,
          succes: false,
        },
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserAction: {
          updateUser: action.payload,
          loading: false,
          error: false,
          succes: true,
        },
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        updateUserAction: {
          updateUser: null,
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
