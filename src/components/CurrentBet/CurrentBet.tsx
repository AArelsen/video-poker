import {useGameStore} from "../../store/gameStore";

export function CurrentBet() {
    const players = useGameStore((
        state)=> state.players);

    const currentPlayerId= useGameStore(
        (state) => state.currentPlayerId,
    );
    const currentBet = useGameStore(
        (state) => state.currentBet,
    );
    const gamePhase = useGameStore(
        (state) => state.gamePhase,
    );
    const setCurrentBet = useGameStore(
        (state) => state.setCurrentBet,
    );

    const currentPlayer = players.find(
        (player) => player.id === currentPlayerId,
    );

    const cannotChangeBet = gamePhase === "dealt";

    return (
        <div>
            <span>
                Current bet <strong>{currentBet}</strong>
            </span>
            <div>
                <button type= "button"
                onClick={() =>
                    setCurrentBet (currentBet - 1)}
                disabled = {
                    cannotChangeBet || currentBet <= 1
                }
                aria-label="Decrease bet"
                >
                    -
                </button>

                <button
                    type="button"
                    onClick={() => 
                    setCurrentBet(currentBet + 1)
                    }
                    disabled={
                        cannotChangeBet ||
                        currentBet >= 5 ||
                        currentBet >=
                        (currentPlayer?.coins ?? 0) 
                    }
                    aria-label="Increase bet"
                    >
                        +
                </button>
            </div>
        </div>
    );

}