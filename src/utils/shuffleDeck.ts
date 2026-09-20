import type { PlayingCard } from "../types/PlayingCard";

/**
 * Returner a shuffled copy av givende deck uten å endre originale
 */

export function shuffleDeck(
    deck: PlayingCard[],
): PlayingCard[] {
    const shuffledDeck = [...deck];

    for (let index = shuffledDeck.length -1; index>0; index--) {
        const randomIndex = Math.floor(
            Math.random() * (index + 1),
        );
        [shuffledDeck[index], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex],
            shuffledDeck[index],
        ];
    }
    return shuffledDeck;
}