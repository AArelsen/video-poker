export type CardSuit =
| "clubs"
| "diamonds"
| "hearts"
| "spades";

export type CardValue =
| "2"
| "3"
| "4"
| "5"
| "6"
| "7"
| "8"
| "9"
| "10"
| "J"
| "Q"
| "K"
| "A";

export interface PlayingCard {
    id: string;
    suit: CardSuit;
    value: CardValue;
}