import {configureStore} from '@reduxjs/toolkit';
import accessTokenReducer from '../features/accessTokenSlice';

export const store = configureStore({
    reducer: {
        accessToken: accessTokenReducer
        }
})