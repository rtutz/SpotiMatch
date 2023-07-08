import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;