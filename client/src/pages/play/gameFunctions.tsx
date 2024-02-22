import { cards } from "./constants";
import { messages } from "./constants";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { gameStates, cardTypes } from "./constants";
import  { decrementCount, incrementDefuse, decrementDefuse, insertCard, setMessage } from "../../Redux/features/gameSlice";
const checkWin = (count: number): string => {
    
    if (count === 1) {
        return gameStates.WIN;
        
    }
    return gameStates.CONTINUE;
}
const insertDecrementMsg = (message: string, cardType: string, dispatch: Dispatch<UnknownAction>) => {
    dispatch(decrementCount());
    dispatch(insertCard(cardType));
    dispatch(setMessage(message));
}
const catCardReveal = (dispatch: Dispatch<UnknownAction>, count: number) => {
    insertDecrementMsg(messages.CatCardMsg, cardTypes.CAT, dispatch);
    return checkWin(count);
}
const bombCardReveal = (dispatch: Dispatch<UnknownAction>, defuse: number, count: number) => {
        
    if(defuse !== 0){
        insertDecrementMsg(messages.BombDefuseMsg, cardTypes.BOMB, dispatch);
        dispatch(decrementDefuse());
        return checkWin(count);
    }
    else{
        insertDecrementMsg(messages.BombCardMsg, cardTypes.BOMB, dispatch);
        return gameStates.LOSE;
    }
}
const defuseCardReveal = (dispatch: Dispatch<UnknownAction>, count: number) => {
    insertDecrementMsg(messages.DefuseCardMsg, cardTypes.DEFUSE, dispatch);
    dispatch(incrementDefuse());
    return checkWin(count);
}
const shuffleCardReveal = (dispatch: Dispatch<UnknownAction>): string => {
    insertDecrementMsg(messages.ShuffleCardMsg, cardTypes.SHUFFLE, dispatch);
    return gameStates.RESTART
}
export const selectFunction = (
    dispatch: Dispatch<UnknownAction>, 
    count: number, 
    defuse: number, 
    ): string => {
    const randomNumber = Math.floor(Math.random() * 4);
    const cardType = cards[randomNumber];
    
    
    
    
    
    switch (cardType) {
        case "cat":
            return catCardReveal(dispatch, count);
            
        case "bomb":
            return bombCardReveal(dispatch, defuse, count);
            
        case "defuse":
            return defuseCardReveal(dispatch, count);
            
        case "shuffle":
            return shuffleCardReveal(dispatch);
            
        default:
            return gameStates.CONTINUE
    }
}