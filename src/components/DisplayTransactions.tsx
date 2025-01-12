import React, { useState, useEffect } from 'react';

interface Transaction {
    type: 'income' | 'expense';
    name: string;
    amount: number;
    date: Date;
}

interface Props {
    transactions: Transaction[];
}

const DisplayTransactions: React.FC<Props> = ({ transactions = [] }) => {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    const filterTransactions = (type: 'income' | 'expense' | 'all') => {
        if (type === 'all') {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter(transaction => transaction.type === type);
            setFilteredTransactions(filtered);
        }
    };

    return (
        <div className='display-transactions' style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Transactions History</h3> 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Transactions</h4>
                <div>
                    <button onClick={() => filterTransactions('all')} style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', marginRight: '10px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
                        All
                    </button>
                    <button onClick={() => filterTransactions('income')} style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', marginRight: '10px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}>
                        Income
                    </button>
                    <button onClick={() => filterTransactions('expense')} style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}>
                        Expenses
                    </button>
                </div>
            </div>

            <div className="transactions" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}>
                <ol className='all'>
                    {filteredTransactions.map((transaction, index) => (
                        <li key={index}>
                            <ul className='singleTransaction' style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', marginBottom: '10px' }}>
                                <li>{transaction.name}</li>
                                <li>{transaction.amount}</li>
                                <li>{transaction.date.toDateString()}</li>
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default DisplayTransactions;