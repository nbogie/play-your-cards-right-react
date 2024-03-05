import { GameAction, reducerFunction } from "../reducer/reducerFunction";
import {
    GameState,
    createInitialState,
    selectHistory,
    selectNoScrewUps,
} from "./gameState";
import { it, expect } from "vitest";

it("should detect game loss", () => {
    const gs1 = createInitialState(4, [1, 2, 10]);

    const actions: GameAction[] = [
        { type: "guess", direction: "lower" },
        { type: "turnNextCard" },
        { type: "guess", direction: "higher" },
        { type: "turnNextCard" },
    ];

    const finalState = applyActions(actions, gs1);
    expect(selectHistory(finalState)).toEqual([
        [10, "lower"],
        [2, "higher"],
        [1, null],
    ]);
    expect(selectNoScrewUps(finalState)).toEqual(false);
});

function applyActions(
    actions: GameAction[],
    initialState: GameState
): GameState {
    return actions.reduce(
        (state, action) => reducerFunction(state, action),
        initialState
    );
}
