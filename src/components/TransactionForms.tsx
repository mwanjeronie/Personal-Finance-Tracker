import type React from "react"

import { useState } from "react"
import type { Transaction } from "../App"
import "./TransactionForms.css"

interface TransactionFormsProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
}

const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Personal Care",
  "Education",
  "Travel",
  "Gifts & Donations",
  "Other",
]

const INCOME_CATEGORIES = ["Salary", "Freelance", "Business", "Investments", "Rental Income", "Gifts", "Other"]

const TransactionForms: React.FC<TransactionFormsProps> = ({ onAddTransaction }) => {
  const [activeForm, setActiveForm] = useState<"income" | "expense" | null>(null)

  // Expense form state
  const [expenseName, setExpenseName] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseDate, setExpenseDate] = useState("")
  const [expenseCategory, setExpenseCategory] = useState(EXPENSE_CATEGORIES[0])

  // Income form state
  const [incomeName, setIncomeName] = useState("")
  const [incomeAmount, setIncomeAmount] = useState("")
  const [incomeDate, setIncomeDate] = useState("")
  const [incomeCategory, setIncomeCategory] = useState(INCOME_CATEGORIES[0])

  const resetExpenseForm = () => {
    setExpenseName("")
    setExpenseAmount("")
    setExpenseDate("")
    setExpenseCategory(EXPENSE_CATEGORIES[0])
  }

  const resetIncomeForm = () => {
    setIncomeName("")
    setIncomeAmount("")
    setIncomeDate("")
    setIncomeCategory(INCOME_CATEGORIES[0])
  }

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTransaction({
      type: "expense",
      name: expenseName,
      amount: Number(expenseAmount),
      date: new Date(expenseDate),
      category: expenseCategory,
    })
    resetExpenseForm()
    setActiveForm(null)
  }

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTransaction({
      type: "income",
      name: incomeName,
      amount: Number(incomeAmount),
      date: new Date(incomeDate),
      category: incomeCategory,
    })
    resetIncomeForm()
    setActiveForm(null)
  }

  return (
    <div className="transaction-forms">
      <div className="form-buttons">
        <button
          className={`form-button ${activeForm === "expense" ? "active" : ""}`}
          onClick={() => setActiveForm("expense")}
        >
          Add Expense
        </button>
        <button
          className={`form-button ${activeForm === "income" ? "active" : ""}`}
          onClick={() => setActiveForm("income")}
        >
          Add Income
        </button>
      </div>

      {activeForm === "expense" && (
        <div className="card form-card">
          <form onSubmit={handleExpenseSubmit}>
            <h2>Add Expense</h2>

            <div className="form-group">
              <label htmlFor="expenseName">Description</label>
              <input
                type="text"
                id="expenseName"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                required
                placeholder="What did you spend on?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expenseCategory">Category</label>
              <select
                id="expenseCategory"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                required
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="expenseAmount">Amount ($)</label>
              <input
                type="number"
                id="expenseAmount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expenseDate">Date</label>
              <input
                type="date"
                id="expenseDate"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setActiveForm(null)}>
                Cancel
              </button>
              <button type="submit">Add Expense</button>
            </div>
          </form>
        </div>
      )}

      {activeForm === "income" && (
        <div className="card form-card">
          <form onSubmit={handleIncomeSubmit}>
            <h2>Add Income</h2>

            <div className="form-group">
              <label htmlFor="incomeName">Description</label>
              <input
                type="text"
                id="incomeName"
                value={incomeName}
                onChange={(e) => setIncomeName(e.target.value)}
                required
                placeholder="Source of income"
              />
            </div>

            <div className="form-group">
              <label htmlFor="incomeCategory">Category</label>
              <select
                id="incomeCategory"
                value={incomeCategory}
                onChange={(e) => setIncomeCategory(e.target.value)}
                required
              >
                {INCOME_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="incomeAmount">Amount ($)</label>
              <input
                type="number"
                id="incomeAmount"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="incomeDate">Date</label>
              <input
                type="date"
                id="incomeDate"
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setActiveForm(null)}>
                Cancel
              </button>
              <button type="submit">Add Income</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default TransactionForms
