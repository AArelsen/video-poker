import { useGameStore } from "../../store/gameStore";

export function CurrentHand (){
    const currentPokerHand = useGameStore(
        (state) => state.currentPokerHand,
    );

    if(!currentPokerHand) {
        return null;
    }
    return (
        <p aria-live="polite">
            Current hand: {' '}
            <strong>{currentPokerHand}</strong>
        </p>
    );
}