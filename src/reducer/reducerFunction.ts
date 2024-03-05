import {
    Direction,
    GameState,
    createInitialState,
    selectIsGameOver,
} from "../gameCore/gameState";

export type GameAction =
    | { type: "guess"; direction: Direction }
    | { type: "turnNextCard" }
    | { type: "startNewGame"; gameLen: number };

export function reducerFunction(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case "guess": {
            if (selectIsGameOver(state)) {
                return state;
            }
            const newHistory = [...state.history];
            const [lastNum, lastGuess] = newHistory.pop()!;
            if (lastGuess !== null) {
                return state; //already made a guess for this!
            }
            newHistory.push([lastNum, action.direction]);
            return { ...state, history: newHistory };
        }
        case "turnNextCard": {
            const last = state.history.at(-1);
            if (last === undefined || last[1] === null) {
                return state;
            }
            const newDeck = [...state.drawDeck];
            const newCard = newDeck.pop()!;
            return {
                ...state,
                drawDeck: newDeck,
                history: [...state.history, [newCard, null]],
            };
        }
        case "startNewGame": {
            if (!selectIsGameOver(state)) {
                return state;
            }
            return createInitialState(action.gameLen);
        }
        default:
            throw new UnreachableCaseError(action);
    }
}

class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}
