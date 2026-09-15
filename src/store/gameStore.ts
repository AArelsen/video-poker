import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/Player";

interface GameStore {
    players: Player[];
    currentPlayerId: string | null;
    addPlayer: (name: string) => boolean;
    selectPlayer: (playerId: string) => void;
}

export const useGameStore = create<GameStore>()(
   persist(
    (set, get) =>({
        players: [],
        currentPlayerId: null,

        addPlayer: (name) => {
            const trimmedName = name.trim();
            
            if(!trimmedName){
                return false;
            }

            const playerExist = get().players.some(
                (player) =>
                    player.name.toLowerCase() === trimmedName.toLowerCase(),
            );
            if(playerExist) {
                return false;
            }
            const newPlayer: Player = {
                id: crypto.randomUUID(),
                name: trimmedName,
                coins: 100,
            };

            set((state)=>({
                players: [...state.players, newPlayer],
                currentPlayerId: newPlayer.id,
            }));
            return true;
        },
        selectPlayer:(playerId) => {
            const playerExist = get().players.some(
                (player)=> player.id === playerId,
            );
            if(!playerExist){
                return;
            }
            set({currentPlayerId: playerId});
        },
    }),
    {
        name: "video-poker-storage",
    },
   ),
);