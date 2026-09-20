import type {
    CardSuit,
    CardValue,
    PlayingCard,
} from "../types/PlayingCard";

const suits: CardSuit[] = [
    "clubs",
    "diamonds",
    "hearts",
    "spades",
];

const values: CardValue[] = [
     "2",
     "3",
     "4",
     "5",
     "6",
     "7",
     "8",
     "9",
     "10",
     "J",
     "Q",
     "K",
     "A",
];

/**
 * Lager og returnerer astandart deck som inneholder 52 kort
 */

export function createDeck(): PlayingCard[]{
    return suits.flatMap((suit) =>
    values.map((value) => ({
        id: "${suit} - ${value}",
        suit,
        value,
    })),
    );
}