import type {
    CardValue,
    PlayingCard,
} from '../types/PlayingCard';
import type { PokerHand } from '../types/PokerHand';


const cardValues: Record<CardValue, number> = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

/**
 * Bestemmer pokerhånden som representeres av fem spillkort.
 * @param cards de fem kortene som skal evalueres.
 * @return den tilsvarende pkerhånden.
 */

export function evaluateHand (
    cards: PlayingCard[],
): PokerHand {
    if(cards.length !== 5){
        throw new Error(
            "A poker hand must contain exactly five cards.",
        );
    }

    const numericValues = cards
        .map((card) => cardValues[card.value])
        .sort((first, second) => first - second);
    
    const uniqueValues = [...new Set(numericValues)];

    const valueOccurrences = numericValues.reduce<
        Record<number, number>
    >((occurrences, value)=> {
        occurrences[value] =
            (occurrences[value] ?? 0) + 1;
        
        return occurrences;
    }, {});

    const occurrenceCounts = Object.values(
        valueOccurrences,
    ).sort((first, second) => second - first);

    const isFlush = cards.every(
        (card) => card.suit === cards[0].suit,
    );

    const isRegularStraight = 
        uniqueValues.length === 5 &&
        uniqueValues.every(
            (value, index) =>
                index === 0 ||
                value === uniqueValues[index -1] + 1,
        );
    
    const isAceLowStraight = 
        uniqueValues.join(",") === "2,3,4,5,14";

    const isStraight = 
        isRegularStraight || isAceLowStraight;

    const isRoyalFlush =
        isFlush && 
        numericValues.join(",") === "10,11,12,13,14";

    if(isRoyalFlush) {
        return "Royal Flush";
    }

    if (isStraight && isFlush) {
        return "Straight Flush";
    }

    if(occurrenceCounts[0] === 4) {
        return "Four of a Kind";
    }

    if(
        occurrenceCounts[0] === 3 &&
        occurrenceCounts[1] === 2
    ) {
        return "Full House";
    }

    if(isFlush) {
        return "Flush";
    }

    if(isStraight){
        return "Straight";
    }

    if(occurrenceCounts [0] === 3) {
        return "Three of a Kind";
    }

    const pairCount = occurrenceCounts.filter(
        (count) => count === 2,
    ).length;

    if(pairCount === 2){
        return "Two Pair";
    }

    return "High Card";
}    