import { CREATE_NEW_USER, FOREGT_PASSWORD, GET_CURERNT_USER, LOGIN_USER, RESET_PASSWORD, UPDATE_USER_PASSWORD, UPDATE_USER_PROFILE, VERIFY_PASSWORD } from "../type";

const initialState = {
    createUser: [],
    loginUser: [],
    currentUser: [],
    forgetPassword: [],
    verifyPassword: [],
    resetPassword: [],
    userProfile: [],
    userChangePassword: [],
    loading: true
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_USER:
            return {...state, createUser: action.payload, loading: false };
        case LOGIN_USER:
            return {...state, loginUser: action.payload, loading: false };
        case GET_CURERNT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case FOREGT_PASSWORD:
            return {
                ...state,
                forgetPassword: action.payload,
            }
        case VERIFY_PASSWORD:
            return {
                ...state,
                verifyPassword: action.payload,
            }
        case RESET_PASSWORD:
            return {
                ...state,
                resetPassword: action.payload,
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
            }
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                userChangePassword: action.payload,
            }
        default:
            return state;
    }
};