import {
    AuthState,
    AuthActionTypes,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    LOGOUT,
} from './types';

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    user: null,
    loading: false,
    error: null,
};

const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case REFRESH_TOKEN_REQUEST:
            return { ...state, loading: true, error: null };

        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                loading: false,
                error: null,
            };

        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case REFRESH_TOKEN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };

        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                loading: false,
                error: null,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                refreshToken: null,
                user: null,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default authReducer;
