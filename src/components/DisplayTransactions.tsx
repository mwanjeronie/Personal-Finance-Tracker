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
        <div className='display-transactions' style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h4>Transactions</h4>

            <div className="transactions" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}>
            
            <ol className='all'>
                <li>
                    <ul className='singleTransaction' style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', marginBottom: '10px' }}>
                        <li>{6645}</li>
                        <li>{983737}</li>
                        <li>{736627}</li>
                    </ul>
                </li>
                <li>
                    <ul className='singleTransaction' style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', marginBottom: '10px' }}>
                        <li>{6645}</li>
                        <li>{983737}</li>
                        <li>{736627}</li>
                    </ul>
                </li>
            </ol>
            </div>
        </div>
    );
};

export default DisplayTransactions;