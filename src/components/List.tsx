import React from 'react';

interface Transaction {
    id: number;
    description: string;
    amount: number;
}

interface Props {
    transactions: Transaction[];
}

const DisplayTransactions: React.FC<Props> = ({ transactions }) => {
    return (
        <div className="display-transactions">
            {transactions.map(transaction => (
                <div key={transaction.id} className="transaction">
                    <p>Description: {transaction.description}</p>
                    <p>Amount: ${transaction.amount}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayTransactions;