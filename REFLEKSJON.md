# Refleksjonsnotat

## Læringsprosessen

Denne oppgaven har gitt meg praktisk erfaring med å kombinere React, React Router, Zustand og TypeScript i ett prosjekt. Jeg hadde lite kunnskap om poker før jeg startet, så jeg måtte først sette meg inn i de grunnleggende reglene og forstå hvordan pokerhender identifiseres.

Jeg begynte med å dele opp oppgaven i mindre deler. Først opprettet jeg prosjektet og navigasjonen mellom sidene. Deretter laget jeg spilleradministrasjon, kortstokken og kortkomponenten. Etter dette implementerte jeg spillflyten, evaluering av pokerhender, utbetalinger og lagring av spilltilstanden.

## Valg jeg har tatt

Jeg valgte å bruke én `Card`-komponent for både forsiden og baksiden av kortet. Komponenten bruker egenskapen `isFaceDown` for å avgjøre hvilken side som skal vises. Dette reduserer duplisering fordi begge variantene deler størrelse, struktur og mye av den samme oppførselen.

All tilstand som har med spillet å gjøre, ligger i en Zustand-store. Lokal tilstand brukes bare der den tilhører én komponent, for eksempel spillerens navn og feilmelding i skjemaet. Zustand-store-en persisteres i `localStorage`, slik at en aktiv runde og spillerdata ikke forsvinner ved navigering eller oppdatering av nettleseren.

Jeg delte også arbeidet inn i flere Git-brancher og brukte Pull Requests for å merge funksjonaliteten til `main`. Dette gjorde det enklere å arbeide med én del av prosjektet om gangen og holde Git-historikken oversiktlig.

## Feil og utfordringer

En av de største utfordringene var å forstå og implementere evalueringen av pokerhender. Jeg løste dette ved å dele logikken opp i mindre kontroller, som antall kort med samme verdi, flush og straight. Håndtypene kontrolleres fra den sterkeste til den svakeste hånden.

Jeg støtte også på flere mindre feil underveis. Noen CSS-klassenavn var skrevet feil, og derfor ble ikke stilene brukt på kortene. Jeg hadde også brukt vanlige anførselstegn i stedet for template literals, slik at variabler ble vist som tekst. I tillegg kalte ikke knappen for å redusere innsatsen funksjonen riktig. Jeg fant disse feilene ved å lese feilmeldinger, kontrollere koden, teste funksjonene enkeltvis og kjøre `npm run build` regelmessig.

Jeg testet også løsningen manuelt med forskjellige skjermstørrelser og kun med tastaturet. Dette hjalp meg med å oppdage problemer med kortvisning, knapper, fokusmarkering og avstand mellom elementer.

## Bruk av hjelpemidler

Jeg har brukt dokumentasjon, feilmeldinger og AI som støtte til forklaringer, feilsøking og strukturering av arbeidet. Jeg har gått gjennom endringene selv, skrevet og rettet koden i prosjektet og testet funksjonaliteten etter hvert trinn. Dette har vært viktig for at jeg skulle forstå løsningene og ikke bare legge inn kode uten å vite hvordan den fungerer.

## Hva jeg har lært

Gjennom oppgaven har jeg fått en bedre forståelse av komponentdeling, props, TypeScript-typer, global tilstand med Zustand og navigasjon med React Router. Jeg har også fått mer erfaring med å skille spillogikk fra presentasjonskode, persistere tilstand og utvikle et grensesnitt som fungerer med både mus, berøring og tastatur.

Hvis jeg skulle videreutviklet prosjektet, ville jeg lagt til automatiserte tester for evaluering av pokerhender og spillflyten. Jeg ville også arbeidet videre med det visuelle designet og gitt spilleren tydeligere informasjon om pokerhendene.