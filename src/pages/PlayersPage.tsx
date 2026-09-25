import { useState, type FormEvent } from "react";
import { useGameStore } from "../store/gameStore";
import "./PlayersPage.css";

export function PlayersPage(){
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const players = useGameStore((state) => state.players);
    const currentPlayerId = useGameStore(
        (state) => state.currentPlayerId,
    );

    const addPlayer = useGameStore((state)=>state.addPlayer);
    const selectPlayer = useGameStore(
        (state) => state.selectPlayer,
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const playerCreated = addPlayer(name);

        if(!playerCreated) {
            setError("Enter a valid and unique player name.");
            return;
        }
        setName("");
        setError("");
    }


    return(
        <main>
            <h1>Players</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="player-name">Player name</label>

                <input
                    id="player-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={30}
                />

                <button type="submit">Create player</button>

                {error && <p role="alert">{error}</p>}
            </form>
            <h2>Existing players</h2>

            {players.length=== 0 ? (
                <p>No players have been created.</p>
            ) : (
                <ul className="player-list">
                    {players.map((player) => {
                        const isCurrentPlayer = 
                            player.id === currentPlayerId;
                        return (
                            <li key={player.id}
                                className="player-list__item"
                            >
                                <span>
                                    {player.name} - {player.coins} coins
                                </span>
                                <button
                                    type="button"
                                    onClick={() => selectPlayer(player.id)}
                                    disabled={isCurrentPlayer}
                                >
                                    {isCurrentPlayer
                                        ? "Current player"
                                        : "Select player"
                                    }
                                </button>
                            </li>
                        );    
                    })}
                </ul>
            )}
        </main>
    );
}