import { Dispatch } from "react";
import { GameState } from "../gameCore/gameState";
import { GameAction } from "../reducer/reducerFunction";

export function StartNewGameButton({
    dispatch,
}: {
    state: GameState;
    dispatch: Dispatch<GameAction>;
}) {
    function startNewGame(gameLen: number) {
        dispatch({ type: "startNewGame", gameLen });
    }

    return (
        <div className={"startNewGameButtons"}>
            <button
                className="startNewGameButton"
                onClick={() => startNewGame(3)}
            >
                New Game: Easy
            </button>
            <button
                className="startNewGameButton"
                onClick={() => startNewGame(5)}
            >
                New Game: Hard
            </button>
        </div>
    );
}
