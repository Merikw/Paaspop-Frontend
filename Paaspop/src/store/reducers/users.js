import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_FAIL } from "../actions/actionTypes"

const initialState = {
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_USER:
            return {...state, newUser: { loading: true}}
        case ADD_USER_SUCCESS:
            return {...state, newUser: {user: action.payload, error: null, loading: false}}
        case ADD_USER_FAIL:
            return {...state, newUser: {user: null, error: action.payload, loading: false}}
        default:
            return state;
    }
}

export default reducer