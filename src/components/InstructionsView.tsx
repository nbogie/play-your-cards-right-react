import { useState } from "react";

export function InstructionsView() {
    const [areInstructionsHidden, hideInstructions] = useState(false);
    return (
        !areInstructionsHidden && (
            <div className={"instructions"}>
                <a href="https://www.youtube.com/watch?v=a1MDqJJoGZg">
                    watch it played
                </a>
                <button onClick={() => hideInstructions(true)}>hide</button>
            </div>
        )
    );
}
