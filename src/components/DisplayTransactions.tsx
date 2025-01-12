import React from 'react';


interface Transaction {
    name: string;
    amount: number;
    date: Date; 
    RoG: boolean;
}

interface Props {
    transactions: Transaction[];
}

const DisplayTransactions: React.FC<Props> = ({ transactions }) => {
    return (
        <div className='display-transactions' style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Transactions History</h3> 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Transactions</h4>
                <button onClick={() => {
                        const filterOptions = window.confirm("Filter by:\n\nPress OK for Expenses\nPress Cancel for Income");
                        if (filterOptions) {
                            console.log('Expenses filter selected');
                        } else {
                            console.log('Income filter selected');
                        }
                    }} style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
                        <path d="M1.5 1.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.146.354L10 7.207v6.586l-4 2V7.207L1.646 2.854A.5.5 0 0 1 1.5 2.5v-1z"/>
                    </svg>
                    {/* <span>Filter Transactions</span> */}
                </button>
            </div>

            <div className="transactions" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}>
            
            <ol className='all'>
                <li>
                    <ul className='singleTransaction' style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', marginBottom: '10px' }}>
                        <li>{55}</li>
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