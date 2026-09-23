import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/Player";
import type  { PlayingCard } from "../types/PlayingCard";
import { createDeck } from "../utils/createDeck";
import { shuffleDeck } from "../utils/shuffleDeck";
import type { PokerHand } from "../types/PokerHand";
import { evaluateHand } from "../utils/evaluateHand";
import { payoutMultipliers } from "../data/payouts";

export type GamePhase = "idle" |  "dealt" | "finished";

interface GameStore {
    players: Player[];
    currentPlayerId: string | null;
    deck: PlayingCard[];
    hand: PlayingCard[];
    discardedCards: PlayingCard[];
    heldCardIds: string[];
    currentBet: number;
    gamePhase: GamePhase;
    addPlayer: (name: string) => boolean;
    selectPlayer: (playerId: string) => void;
    setCurrentBet: (bet: number) => void;
    startRound: () => boolean;
    toggleHold: (cardId: string) => void;
    drawCards: () => void;
    currentPokerHand: PokerHand | null;
    lastWin: number;
}

export const useGameStore = create<GameStore>()(
   persist(
    (set, get) =>({
        players: [],
        currentPlayerId: null,
        deck: [],
        hand: [],
        discardedCards: [],
        heldCardIds: [],
        currentBet: 1,
        gamePhase: "idle",
        currentPokerHand: null,
        lastWin: 0,

        addPlayer: (name) => {
            const trimmedName = name.trim();
            
            if(!trimmedName || get().gamePhase === "dealt"){
                return false;
            }

            const playerExist = get().players.some(
                (player) =>
                    player.name.toLowerCase() === 
                    trimmedName.toLowerCase(),
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
            if(get().gamePhase === "dealt"){
                return;
            }
            const playerExist = get().players.some(
                (player)=> player.id === playerId,
            );
            if(!playerExist){
                return;
            }
            set({currentPlayerId: playerId});
        },
        setCurrentBet: (bet) => {
            if(get().gamePhase === "dealt") {
                return;
            }
            const currentPlayer = get().players.find(
                (player) =>
                    player.id === get().currentPlayerId,
            );

            if(
                !currentPlayer ||
                !Number.isInteger(bet) ||
                bet < 1 ||
                bet > 5 ||
                bet > currentPlayer.coins
            ) {
                return;
            }
            set({currentBet: bet});
        },

        startRound: () => {
            const state = get();

            const currentPlayer = state.players.find(
                (player) => 
                    player.id === state.currentPlayerId,
            );

            if(
                !currentPlayer ||
                state.gamePhase === "dealt" || 
                currentPlayer.coins < state.currentBet
            ){
                return false;
            }

            const shuffledDeck = shuffleDeck(createDeck());
            const hand = shuffledDeck.slice(0, 5);
            const remainingDeck = shuffledDeck.slice(5);

            set((currentState) => ({
                players: currentState.players.map((player) =>
                    player.id === currentPlayer.id
                        ? {
                                ...player,
                                coins:
                                    player.coins - 
                                    currentState.currentBet,
                         }
                        : player,
                ),
                deck: remainingDeck,
                hand,
                discardedCards: [],
                heldCardIds: [],
                currentPokerHand: evaluateHand(hand),
                lastWin: 0,
                gamePhase: "dealt",
            }));
            return true;
        },
        toggleHold:(cardId) => {
            const state = get();

            if(
                state.gamePhase !=="dealt" ||
                !state.hand.some((card) => card.id === cardId)
            ){
                return;
            }

            set((currentState) => ({
                heldCardIds:
                    currentState.heldCardIds.includes(cardId)
                        ? currentState.heldCardIds.filter(
                            (id) => id !== cardId,
                         )
                        : [...currentState.heldCardIds, cardId], 

            }));
        },

        drawCards: () => {
            const state = get();

            if(state.gamePhase !== "dealt"){
                return;
            }

            const cardsToDiscard = state.hand.filter(
                (card) => 
                    !state.heldCardIds.includes(card.id),
            );

            const replacementCards = state.deck.slice(
                0,
                cardsToDiscard.length,
            );

            let replacementIndex = 0;

            const updateHand = state.hand.map((card) => {
                if(state.heldCardIds.includes(card.id)){
                    return card;
                }

                const replacementCard = replacementCards[replacementIndex];

                replacementIndex +=1;

                return replacementCard;
            });

            const pokerHand = evaluateHand(updateHand);

            const winnings=
                state.currentBet * payoutMultipliers[pokerHand];

            set({
                players: state.players.map((player) =>
                    player.id === state.currentPlayerId
                        ? {
                            ...player,
                            coins: player.coins + winnings,
                        }
                        : player,
                    ),
                deck: state.deck.slice(cardsToDiscard.length),
                hand: updateHand,
                discardedCards: [
                    ...state.discardedCards,
                    ...cardsToDiscard,
                ],
                heldCardIds: [],
                currentPokerHand: pokerHand,
                lastWin: winnings,
                gamePhase:  'finished',
            });
        },
    }),
    {
        name: "video-poker-storage",
    },
   ),
);