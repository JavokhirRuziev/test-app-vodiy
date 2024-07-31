import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers';

const rootReducer: any = combineReducers({
    auth: authReducer,
});

const loadState = () => {
    try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');
        return {
            auth: {
                token: token || null,
                refreshToken: refreshToken || null,
                user: user ? JSON.parse(user) : null,
                loading: false,
                error: null,
            },
        };
    } catch (error) {
        return undefined;
    }
};

const initialState = loadState();
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
