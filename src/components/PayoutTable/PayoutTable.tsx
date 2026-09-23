import {
    payoutMultipliers,
    pokerHandOrder,
} from "../../data/payouts";
import './PayoutTable.css';

export function PayoutTable() {
    return (
        <table className="payout-table">
            <caption>Poker hand payouts</caption>

            <thead>
                <tr>
                    <th scope="col">Poker hand</th>
                    <th scope="col">Payout</th>
                </tr>
            </thead>

            <tbody>
                {pokerHandOrder.map((hand) =>(
                    <tr key={hand}>
                        <td>{hand}</td>
                        <td>
                            {payoutMultipliers[hand] === 0
                                ? 'No payout'
                                : `${payoutMultipliers[hand]} x bet`}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}