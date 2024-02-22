export const cards: string[] = ["cat", "shuffle", "defuse", "bomb"];
export const messages = {
    CatCardMsg: "cat card revealed",
    DefuseCardMsg: "defuse card revealed",
    BombCardMsg: "bomb card revealed",
    ShuffleCardMsg: "shuffle card revealed. The game has been reset.",
    BombDefuseMsg: "bomb card was defused",
    DefaultMsg: "Click the deck to reveal a card"
}
export const gameStates = {
    RESTART: "restart",
    LOSE: "lose",
    WIN: "win",
    CONTINUE: "continue",
    ERROR: "error",
    LOADING: "loading"
}
export const cardTypes = {
    CAT: "cat",
    SHUFFLE: "shuffle",
    DEFUSE: "defuse",
    BOMB: "bomb"
}