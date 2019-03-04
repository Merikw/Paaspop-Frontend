import { Post } from "../api/serverRequests"

import { ADD_USER_IS_LOADING, ADD_USER_SUCCESS, ADD_USER_FAIL } from "./actionTypes"

export const addUser = (user) => {
    return (dispatch) => {
        Post("users", user)
    }
}

export const addUserIsLoading = (bool) => {
    return {
        type: ADD_USER_IS_LOADING,
        payload: bool
    }
}

export const addUserSuccess = (newUser) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: newUser
    }
}

export const addUserFailure = (error) => {
    return {
        type: ADD_USER_FAIL,
        payload: error
    }
}