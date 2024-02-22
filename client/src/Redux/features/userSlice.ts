import { createSlice } from "@reduxjs/toolkit";
export type userState = {
    score: number;
    username: string | null;
}
const initialState: userState = {
    score: 0,
    username: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateScore: (state, action) => {
            state.score = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        
        
    }
});

export const { updateScore, setUsername } = userSlice.actions;

export default userSlice.reducer;