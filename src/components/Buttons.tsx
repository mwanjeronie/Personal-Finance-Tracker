import React, { useState } from 'react';
import './Buttons.css';
import '../components/form.css';
import '../App.css';
// import { expenseName, expenseAmount, expenseDate, incomeSource, incomeAmount, incomeDate } from './functions';
// import { useDispatch } from 'react-redux';
// import { addExpense, addIncome } from '../redux/actions';
import DisplayTransactions from './DisplayTransactions';
const Buttons: React.FC = () => {
    const [showExpensesForm, setShowExpensesForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);

    const handleExpensesClick = () => {
        setShowExpensesForm(true);
        setShowIncomeForm(false);
    };

    const handleIncomeClick = () => {
        setShowIncomeForm(true);
        setShowExpensesForm(false);
    };
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [incomeSource, setIncomeSource] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeDate, setIncomeDate] = useState('');

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button 
                    onClick={handleExpensesClick} 
                    style={{ 
                        padding: '10px 20px', 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        borderRadius: '5px', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        transition: 'transform 0.2s' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Expenses
                </button>
                <button 
                    onClick={handleIncomeClick} 
                    style={{ 
                        padding: '10px 20px', 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        borderRadius: '5px', 
                        boxShadow: '0 4px 8px rgba(104, 95, 95, 0.1)', 
                        transition: 'transform 0.2s' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Income
                </button>
            </div>
            {showExpensesForm && (
                <form className="expenses-form" >
                    <h2>Expenses Form</h2>
                    <div className="form-group">
                        <label htmlFor="expenseName">Expense Name:</label>
                        <input 
                            type="text" 
                            id="expenseName" 
                            name="expenseName" 
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expenseAmount">Amount:</label>
                        <input 
                            type="number" 
                            id="expenseAmount" 
                            name="expenseAmount" 
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expenseDate">Date:</label>
                        <input 
                            type="date" 
                            id="expenseDate" 
                            name="expenseDate" 
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Expense</button>
                    {/* Add your expenses form fields here */}
                    {/* <div className="form-group">
                        <label htmlFor="expenseName">Expense Name:</label>
                        <input type="text" id="expenseName" name="expenseName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expenseAmount">Amount:</label>
                        <input type="number" id="expenseAmount" name="expenseAmount" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expenseDate">Date:</label>
                        <input type="date" id="expenseDate" name="expenseDate" />
                    </div>
                    <button type="submit" className="submit-button">Add Expense</button> */}
                </form>
            )}
            {showIncomeForm && (
                <form className="income-form">
                    <h2>Income Form</h2>
                    <div className="form-group">
                        <label htmlFor="incomeSource">Income Source:</label>
                        <input 
                            type="text" 
                            id="incomeSource" 
                            name="incomeSource" 
                            value={incomeSource}
                            onChange={(e) => setIncomeSource(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="incomeAmount">Amount:</label>
                        <input 
                            type="number" 
                            id="incomeAmount" 
                            name="incomeAmount" 
                            value={incomeAmount}
                            onChange={(e) => setIncomeAmount(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="incomeDate">Date:</label>
                        <input 
                            type="date" 
                            id="incomeDate" 
                            name="incomeDate" 
                            value={incomeDate}
                            onChange={(e) => setIncomeDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Income</button>
                </form>
            )}
            <DisplayTransactions transactions={[]} />
        </div>
    );
};

export default Buttons;