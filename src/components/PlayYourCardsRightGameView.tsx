import { useReducer } from "react";
import {
    createInitialState,
    selectHistory,
    selectIsGameOver,
    selectWinState,
} from "../gameCore/gameState";
import { reducerFunction } from "../reducer/reducerFunction";
import { HistoryView } from "./HistoryView";
import { StartNewGameButton } from "./StartNewGameButton";
import { ChoiceView } from "./ChoiceView";
import { InstructionsView } from "./InstructionsView";
import { useAutoTurnCard } from "./useAutoTurnCard";
import { WinLoseView } from "./WinLoseView";

export function PlayYourCardsRightGameView() {
    const initialState = createInitialState();
    // const initialState = createInitialState(4, [1, 2, 10])//example for testing

    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const winState = selectWinState(state);
    const isGameOver = selectIsGameOver(state);

    useAutoTurnCard(state, dispatch);

    return (
        <div className="game">
            <HistoryView history={selectHistory(state)} />

            {!isGameOver && <ChoiceView {...{ state, dispatch }} />}

            <WinLoseView winState={winState} />
            {selectIsGameOver(state) && (
                <StartNewGameButton state={state} dispatch={dispatch} />
            )}

            <hr />
            <InstructionsView />
        </div>
    );
}
