import { Dispatch, useEffect } from "react";
import { GameState, selectLastGuess } from "../gameCore/gameState";
import { GameAction } from "../reducer/reducerFunction";

export function useAutoTurnCard(
    state: GameState,
    dispatch: Dispatch<GameAction>
) {
    //two seconds after ANY state change, this registered fn will be called
    //The fn will do nothing unless a guess has been made and it's time to turn the next card
    //race condition possible for this to be triggered a couple of times quickly
    //but reducer will not allow multiple turns in sequence
    return useEffect(() => {
        if (!selectLastGuess(state)) {
            return;
        }
        const id = setTimeout(() => {
            dispatch({ type: "turnNextCard" });
        }, 2000);
        //when unmounted, stop pending action (in strict mode in dev)
        return () => clearTimeout(id);
    }, [state, dispatch]);
}
