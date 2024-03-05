import { Direction } from "../gameCore/gameState";

export function SymbolForDirection({
    direction,
}: {
    direction: Direction | null;
}): JSX.Element {
    function stringSymbolForDirection(direction: Direction | null): string {
        if (direction === null) {
            return "?";
        }
        return direction === "lower" ? "⬇️" : "⬆️";
    }
    return <div>{stringSymbolForDirection(direction)}</div>;
}
