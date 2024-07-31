import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface AuthState {
    token: string | null;
    refreshToken: string | null;
    user: any;
    loading: boolean;
    error: string | null;
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
        token: string;
        refreshToken: string;
    };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

interface GetUserRequestAction {
    type: typeof GET_USER_REQUEST;
}

interface GetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: any;
}

interface GetUserFailureAction {
    type: typeof GET_USER_FAILURE;
    payload: string;
}

interface RefreshTokenRequestAction {
    type: typeof REFRESH_TOKEN_REQUEST;
}

interface RefreshTokenSuccessAction {
    type: typeof REFRESH_TOKEN_SUCCESS;
    payload: string;
}

interface RefreshTokenFailureAction {
    type: typeof REFRESH_TOKEN_FAILURE;
    payload: string;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | GetUserRequestAction
    | GetUserSuccessAction
    | GetUserFailureAction
    | RefreshTokenRequestAction
    | RefreshTokenSuccessAction
    | RefreshTokenFailureAction
    | LogoutAction;

export type ThunkDispatchType = ThunkDispatch<
    AuthState,
    unknown,
    AuthActionTypes
>;

export type ThunkResult<R> = ThunkAction<
    R,
    AuthState,
    unknown,
    AuthActionTypes
>;
