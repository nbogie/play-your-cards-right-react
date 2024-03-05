import { WinState } from "../gameCore/gameState";

export function WinLoseView({ winState }: { winState: WinState }) {
    if (winState === "won") {
        return <div className="win gameOverAnnouncement">You Won!</div>;
    }
    if (winState === "lost") {
        return <div className="loss gameOverAnnouncement">You Lost!</div>;
    }
    return null;
}
