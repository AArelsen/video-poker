import type {
    CardSuit,
    CardValue,
    PlayingCard,
} from "../../types/PlayingCard";
import "./Card.css";

interface CardProps{
    card: PlayingCard;
    isFaceDown?: boolean;
    isHeld?: boolean;
    onClick?: () => void;
}

const suitSymbols: Record<CardSuit, string> = {
    clubs: "♣",
    diamonds: "♦",
    hearts: "♥",
    spades: "♠",
};

const suitNames: Record<CardSuit, string> = {
    clubs: "clubs",
    diamonds: "diamonds",
    hearts: "hearts",
    spades: "spades",
};

const valueNames: Record<CardValue, string> = {
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten",
    J: "Jack",
    Q: "Queen",
    K: "King",
    A: "Ace",
};

export function Card({
    card,
    isFaceDown = false,
    isHeld = false,
    onClick,
}: CardProps){
    const symbol = suitSymbols[card.suit];
    const isRed = 
        card.suit === "hearts" ||
        card.suit === "diamonds";

    const accessibleName = isFaceDown
        ? 'Face-down playing card'
        : `${valueNames[card.value]} of ${suitNames[card.suit]}`;

    const classNames = [
        "playing-card",
        isRed
        ? "playing-card--red"
        : "playing-card--black",
        isFaceDown ? "playing-card--back" : "",
        isHeld ? "playing-card--held" : "",
    ]
        .filter(Boolean)
        .join(" ");
        return (
            <button 
            type="button"
            className = {classNames}
            onClick ={onClick}
            disabled={!onClick}
            aria-label={accessibleName}
            aria-pressed= {onClick ? isHeld : undefined}
            >
                {isFaceDown ? (
                    <span
                        className="playing-card__back-pattern"
                        aria-hidden="true"
                    />
                ) : (
                    <>
                        <span
                        className="playing-card__corner playing-card__corner--top"
                        aria-hidden="true"
                        >
                            <span>{card.value}</span>
                            <span>{symbol}</span>
                        </span>

                        <span
                            className="playing-card__symbol"
                            aria-hidden="true"
                        >
                            {symbol}
                        </span>

                        <span
                            className="playing-card__corner playing-card__corner--bottom"
                            aria-hidden="true"
                        >
                            <span>{card.value}</span>
                            <span>{symbol}</span>
                        </span>

                        {isHeld && (
                            <span className="playing-card__held">
                                Held
                            </span>
                        )}
                        </>    
                )}
            </button>
        )    
}