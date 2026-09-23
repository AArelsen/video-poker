import type {PokerHand} from "../types/PokerHand";

export const pokerHandOrder: PokerHand[] = [
'Royal Flush',
'Straight Flush',
'Four of a Kind',
'Full House',
'Flush',
'Straight',
'Three of a Kind',
'Two Pair',
'One Pair',
'High Card',
];

export const payoutMultipliers: Record<PokerHand, number> = {
    'Royal Flush': 250,
    'Straight Flush': 50,
    'Four of a Kind': 25,
    'Full House': 9,
    'Flush': 6,
    'Straight': 4,
    'Three of a Kind': 3,
    'Two Pair': 2,
    'One Pair': 1,
    'High Card': 0,
}
