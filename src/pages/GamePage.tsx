import { useMemo } from 'react';
import { Game } from '../components/Game/Game';
import { Card } from '../components/Card/Card';
import { createDeck } from '../utils/createDeck';
import { shuffleDeck } from '../utils/shuffleDeck';

export function GamePage() {
    const previewCards = useMemo(
        () => shuffleDeck(createDeck()).slice(0, 5),
        [],
    );

    return (
        <main>
            <h1>Video Poker</h1>

            <Game />

            <details>
                <summary>CSS card preview</summary>

                <h2>Card fronts</h2>

                <div className="card-hand">
                    {previewCards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </div>

                <h2>Card back</h2>

                <div className="card-hand">
                    <Card
                        card={previewCards[0]}
                        isFaceDown
                    />
                </div>

                <h2>Held card</h2>

                <div className="card-hand">
                    <Card
                        card={previewCards[1]}
                        isHeld
                    />
                </div>
            </details>
        </main>
    );
}