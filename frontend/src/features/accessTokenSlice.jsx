import { createSlice } from '@reduxjs/toolkit';

export const accessTokenSlice = createSlice({
    name: 'accessToken',
    initialState: null,
        reducers: {
            setAccessToken: (state, action) => {
                console.log(action);
                return action.payload;
            }
        }
})

export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;