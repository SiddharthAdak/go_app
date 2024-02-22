import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './features/gameSlice';
import userSlice from "./features/userSlice";



export const store = configureStore({
    reducer: {
        game: gameReducer,
        user: userSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch