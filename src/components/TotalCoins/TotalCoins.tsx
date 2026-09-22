import { useGameStore } from '../../store/gameStore';

export const TotalCoins = () => {
    const players = useGameStore((state) => state.players);
    const currentPlayerId = useGameStore(
        (state) => state.currentPlayerId,
    );

    const currentPlayer = players.find(
        (player) => player.id=== currentPlayerId,
    );
    return (
        <div aria-live="polite">
            Coins:{ " "}
            <strong>{currentPlayer?.coins ?? 0} </strong>
        </div>
    );
};