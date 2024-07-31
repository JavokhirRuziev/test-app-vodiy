import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    AuthActionTypes,
    AuthState,
    ThunkDispatchType,
    LOGOUT,
} from './types';
import { request } from 'utils/request';

export const login: any =
    (
        username: string,
        password: string
    ): ThunkAction<void, AuthState, unknown, AuthActionTypes> =>
    async (dispatch: ThunkDispatchType) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await request.post(
                'https://dummyjson.com/auth/login',
                {
                    username,
                    password,
                }
            );
            const { token, refreshToken } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token, refreshToken },
            });
            dispatch(getCurrentUser());
        } catch (error: any) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: error.message,
            });
        }
    };

export const getCurrentUser: any =
    (): ThunkAction<void, AuthState, unknown, AuthActionTypes> =>
    async (dispatch: Dispatch, getState) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No access token found');
            }
            const response = await request.get(
                'https://dummyjson.com/auth/me',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({
                type: GET_USER_SUCCESS,
                payload: response.data,
            });
        } catch (error: any) {
            dispatch({
                type: GET_USER_FAILURE,
                payload: error.message,
            });
        }
    };

export const refreshToken =
    (): ThunkAction<void, AuthState, unknown, AuthActionTypes> =>
    async (dispatch: Dispatch) => {
        dispatch({ type: REFRESH_TOKEN_REQUEST });
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token found');
            }
            const response = await request.post(
                'https://dummyjson.com/auth/refresh',
                {
                    refreshToken,
                    expiresInMins: 30,
                }
            );
            const { token } = response.data;
            localStorage.setItem('token', token);
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: token,
            });
        } catch (error: any) {
            dispatch({
                type: REFRESH_TOKEN_FAILURE,
                payload: error.message,
            });
        }
    };

export const logout: any =
    (): ThunkAction<void, AuthState, unknown, AuthActionTypes> =>
    (dispatch: ThunkDispatchType) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        dispatch({ type: LOGOUT });
    };
