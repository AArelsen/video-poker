import { useMemo } from "react";
import { Card } from "../components/Card/Card";
import { createDeck } from "../utils/createDeck";
import { shuffleDeck } from "../utils/shuffleDeck";

export function GamePage(){
    const previewCards = useMemo(
        () => shuffleDeck(createDeck()).slice(0, 5),
        [],
    );

    return (
        <main>
            <h1>Video Poker</h1>
            <section aria-labelledby="card-preview-heading">
                <h2 id="card-preview-heading">Card preview</h2>

                <div className="card-hand">
                    {previewCards.map((card) => (
                        <Card key={card.id} card={card}/>
                    ))}
                </div>

                <h2>Card back</h2>

                <div className="card-hand">
                    <Card 
                        card={previewCards[0]}
                        isFaceDown
                    />

                </div>
            </section>
        </main>
    );
}