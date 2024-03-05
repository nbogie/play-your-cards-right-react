import { Fragment } from "react";
import { SymbolForDirection } from "./SymbolForDirection";
import { Direction } from "../gameCore/gameState";

export function HistoryView({
    history,
}: {
    history: [number, Direction | null][];
}) {
    return (
        <div className="guesses">
            {history.map(([guess, direction], ix) => {
                return (
                    <Fragment key={ix}>
                        <div className="guess">{guess}</div>
                        <SymbolForDirection direction={direction} />
                    </Fragment>
                );
            })}
        </div>
    );
}
