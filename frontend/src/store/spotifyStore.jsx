import {configureStore} from '@reduxjs/toolkit';
import accessTokenReducer from '../features/accessTokenSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        accessToken: accessTokenReducer,
        user: userReducer
        }
})