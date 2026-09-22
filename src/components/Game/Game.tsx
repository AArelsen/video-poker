import { Link } from "react-router";
import { Card } from "../Card/Card";
import { CurrentBet } from '../CurrentBet/CurrentBet';
import { TotalCoins } from '../TotalCoins/TotalCoins';
import { useGameStore } from '../../store/gameStore';
import "./Game.css";


export function Game() {
    const players = useGameStore(
        (state) => state.players);

        const currentPlayerId = useGameStore(
            (state) => state.currentPlayerId,
        );
        
        const hand = useGameStore(
            (state) => state.hand,
        );

        const heldCardIds = useGameStore(
            (state) => state.heldCardIds,
        );

        const currentBet = useGameStore(
            (state) => state.currentBet,
        );

        const gamePhase = useGameStore(
            (state) => state.gamePhase,
        );

        const startRound = useGameStore(
            (state) => state.startRound,
        );

        const toogleHold = useGameStore(
            (state) => state.toggleHold,
        );

        const drawCards = useGameStore(
            (state) => state.drawCards,
        );

        const currentPlayer = players.find(
            (player) => player.id === currentPlayerId,
        );

        if(!currentPlayer){
            return (
                <section>
                    <h2> No player selected.</h2>
                    <p> Select or create a player before starting.</p>
                    <Link to="/players">Go to Players</Link>
                </section>
            );
        }

        const cannotStartRound =
            gamePhase === "dealt" ||
            currentPlayer.coins < currentBet;

        return (
            <section className="game-board">
                <header className="game-board__status">
                    <div>
                        player: <strong> {currentPlayer.name}</strong>
                    </div>
                    <TotalCoins />
                    <CurrentBet />

                </header>

                {hand.length > 0 && (
                    <div 
                    className="card-hand"
                    aria-label="Current Poker Hand"
                    >
                    {hand.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            isHeld={heldCardIds.includes(card.id)}
                            onClick= {
                                gamePhase === "dealt" 
                                ? () => toogleHold(card.id)
                                : undefined
                            } 
                        />
                    ))}

                    </div>
                )}

                <div className="game-board__actions">
                    {gamePhase !== "dealt" && (
                        <button 
                        type="button"
                        onClick={startRound}
                        disabled={cannotStartRound}
                        >
                            Deal Cards

                        </button>      
                    )}

                    {gamePhase === "dealt" && (
                        <button
                        type="button"
                        onClick={drawCards}
                        >
                            Draw cards

                        </button>
                    )}

                </div>

                {gamePhase === "finished" && (
                    <p
                    role="alert">
                        The player does not have enough coins.
                    </p>
                )}
            </section>
        );
}