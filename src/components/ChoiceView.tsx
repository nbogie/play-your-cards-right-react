import { Dispatch } from "react";
import { GameState } from "../gameCore/gameState";
import { GameAction } from "../reducer/reducerFunction";

export function ChoiceView({
    dispatch,
}: {
    state: GameState;
    dispatch: Dispatch<GameAction>;
}) {
    return (
        <div className="choices">
            <button
                onClick={() => dispatch({ type: "guess", direction: "lower" })}
                className="lower"
            >
                Lower
            </button>
            <button
                onClick={() => dispatch({ type: "guess", direction: "higher" })}
                className="higher"
            >
                Higher
            </button>
        </div>
    );
}
