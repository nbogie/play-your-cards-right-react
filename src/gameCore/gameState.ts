import { shuffle } from "lodash";

export type Direction = "higher" | "lower";
export type WinState = "won" | "lost" | "in-play";
export interface GameState {
    drawDeck: number[];
    history: [number, Direction | null][];
    gameLen: number;
}

export function createInitialState(
    gameLen: number = 3,
    initialDrawDeck?: number[]
): GameState {
    const drawDeck =
        initialDrawDeck ??
        shuffle(Array.from({ length: 52 }, (_, i) => (i % 15) + 1));

    const first = drawDeck.pop()!;

    return { drawDeck, history: [[first, null]], gameLen };
}

export function selectHistory(state: GameState) {
    return state.history;
}

export function selectLastGuess(state: GameState): Direction | null {
    return state.history.at(-1)?.[1] ?? null;
}

export function selectIsGameOver(state: GameState) {
    return state.history.length >= state.gameLen || !selectNoScrewUps(state);
}
export function selectWinState(state: GameState): WinState {
    if (!selectNoScrewUps(state)) {
        return "lost";
    }
    if (state.history.length >= state.gameLen) {
        return "won";
    }
    return "in-play";
}

export function selectNoScrewUps(state: GameState) {
    for (let i = 1; i < state.history.length; i++) {
        const lastCard = state.history[i - 1][0];
        const guess = state.history[i - 1][1];
        const newCard = state.history[i][0];
        if (guess === null) {
            continue;
        }
        if (!isGuessCorrect(lastCard, newCard, guess)) {
            return false;
        }
    }
    return true;
}

function isGuessCorrect(
    lastCard: number,
    newCard: number,
    guess: Direction
): boolean {
    return (
        (guess === "higher" && newCard > lastCard) ||
        (guess === "lower" && newCard < lastCard)
    );
}
