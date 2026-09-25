# Video Poker

Et Video Poker-spill utviklet som en individuell skoleoppgave. Prosjektet viser bruk av React, React Router, Zustand og TypeScript.

## Funksjonalitet

- Opprette og velge spillere
- Hver ny spiller starter med 100 mynter
- Velge innsats mellom 1 og 5 mynter
- Dele ut fem kort fra en stokket kortstokk
- Holde kort som ikke skal byttes
- Bytte kortene som ikke er holdt
- Evaluere den ferdige pokerhånden
- Beregne gevinst ut fra innsats og pokerhånd
- Beholde spilldata ved navigering og oppdatering av nettleseren
- Vise regler og utbetalinger på en egen side

## Teknologier

- React
- React Router
- Zustand
- TypeScript
- Vite
- CSS

## Installasjon

Klon repositoryet og installer avhengighetene:

```bash
git clone https://github.com/AArelsen/video-poker.git
cd video-poker
npm install
```

Start utviklingsserveren:

```bash
npm run dev
```

Lag en produksjonsbuild:

```bash
npm run build
```

## Slik spiller du

1. Opprett eller velg en spiller.
2. Velg innsats mellom 1 og 5 mynter.
3. Trykk på **Deal Cards** for å få fem kort.
4. Trykk på kortene du ønsker å beholde. Disse markeres med **Held**.
5. Trykk på **Draw cards** for å bytte kortene som ikke er holdt.
6. Den ferdige pokerhånden evalueres, og eventuell gevinst legges til spillerens mynter.

## Pokerhender og utbetalinger

Utbetalingen beregnes ved å multiplisere innsatsen med håndens multiplikator.

| Pokerhånd | Multiplikator |
|---|---:|
| Royal Flush | 250 |
| Straight Flush | 50 |
| Four of a Kind | 25 |
| Full House | 9 |
| Flush | 6 |
| Straight | 4 |
| Three of a Kind | 3 |
| Two Pair | 2 |
| One Pair | 1 |
| High Card | Ingen utbetaling |

## Tilstand og lagring

Spilltilstanden håndteres i en Zustand-store. Store-en inneholder blant annet spillere, kortstokk, spillerens hånd, kastede kort, innsats, spillfase og gevinst.

Tilstanden persisteres i `localStorage`. En aktiv runde fortsetter derfor dersom spilleren navigerer til en annen side eller oppdaterer nettleseren.

## Kortkomponenten

Forsiden og baksiden av kortet håndteres i samme `Card`-komponent ved hjelp av egenskapen `isFaceDown`.

Denne løsningen ble valgt fordi begge variantene representerer det samme spillekortet og deler størrelse, struktur og oppførsel. Det reduserer duplisering og gjør komponenten enklere å vedlikeholde.

Kortet er laget med CSS Grid. Symboler, farger og kortets bakside er laget med CSS og tekstsymboler.

## Tilgjengelighet og responsivt design

Applikasjonen kan brukes med mus, berøring og tastatur. Interaktive elementer har tilgjengelige navn og synlig fokusmarkering.

Layouten tilpasser seg forskjellige skjermstørrelser, og kortene brytes over flere linjer på mindre skjermer.