import { createSlice } from "@reduxjs/toolkit";
export type gameState = {
    count: number;
    cardList: string[];
    defuse: number;
    message: string;
}
const initialState: gameState = {
    count: 5,
    cardList: [],
    defuse: 0,
    message: "Click the deck to reveal a card"
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        decrementCount: (state) => {
            state.count -= 1;
        },
        incrementDefuse: (state) => {
            state.defuse += 1;
        },
        decrementDefuse: (state) => {
            state.defuse -= 1;
        },
        reset: (state) => {
            state.count = 5;
            state.defuse = 0;
            state.cardList = [];
            state.message = initialState.message;
        },
        insertCard: (state, action) => {
            state.cardList.push(action.payload);
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const { decrementCount, incrementDefuse, decrementDefuse, reset, insertCard, setMessage } = gameSlice.actions;

export default gameSlice.reducer;