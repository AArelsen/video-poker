import { PayoutTable } from "../components/PayoutTable/PayoutTable";


export function RulesPage(){
    return(
        <main>
            <h1>Rulers and payouts</h1>
            
            <section>
                <h2>How to play</h2>

                <ol>
                    <li>Select or create a player.</li>
                    <li>Choose a bet between 1 and 5 coins.</li>
                    <li>Deal five cards.</li>
                    <li>Select the cards you want to hold.</li>
                    <li>Replace the remaining cards.</li>
                    <li>Your final hand determines the payout.</li>
                </ol>
            </section>

            <section>
                <h2>payout calculation</h2>
                <p>
                    The payout is calculated by multiplying
                    the selected bet by the hand multiplier.
                </p>
                <PayoutTable/>
            </section>
        </main>
    );
}