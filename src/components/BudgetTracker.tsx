import type React from "react"

import { useState } from "react"
import type { Transaction, Budget } from "../App"
import { Trash, Edit } from "../icons/Icons"
import "./BudgetTracker.css"

interface BudgetTrackerProps {
  budgets: Budget[]
  transactions: Transaction[]
  onAddBudget: (budget: Budget) => void
  onUpdateBudget: (budget: Budget) => void
  onDeleteBudget: (category: string) => void
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

const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  budgets,
  transactions,
  onAddBudget,
  onUpdateBudget,
  onDeleteBudget,
}) => {
  const [showForm, setShowForm] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0])
  const [limit, setLimit] = useState("")

  // Get all expense categories that don't already have a budget
  const availableCategories = EXPENSE_CATEGORIES.filter((cat) => !budgets.some((budget) => budget.category === cat))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingBudget) {
      onUpdateBudget({
        category: editingBudget.category,
        limit: Number(limit),
      })
    } else {
      onAddBudget({
        category,
        limit: Number(limit),
      })
    }

    resetForm()
  }

  const startEditing = (budget: Budget) => {
    setEditingBudget(budget)
    setLimit(budget.limit.toString())
    setShowForm(true)
  }

  const resetForm = () => {
    setCategory(availableCategories[0] || EXPENSE_CATEGORIES[0])
    setLimit("")
    setEditingBudget(null)
    setShowForm(false)
  }

  // Calculate spending for each budget
  const budgetWithSpending = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.type === "expense" && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0)

    const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0

    return {
      ...budget,
      spent,
      percentage: Math.min(percentage, 100),
      remaining: Math.max(budget.limit - spent, 0),
    }
  })

  return (
    <div className="budget-tracker">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Budget Tracker</h2>
          {!showForm && (
            <button onClick={() => setShowForm(true)} disabled={availableCategories.length === 0 && !editingBudget}>
              {availableCategories.length === 0 ? "All Categories Budgeted" : "Add Budget"}
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="budget-form">
            <h3>{editingBudget ? "Edit Budget" : "Add New Budget"}</h3>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              {editingBudget ? (
                <input type="text" value={editingBudget.category} disabled />
              ) : (
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="limit">Monthly Budget Limit ($)</label>
              <input
                type="number"
                id="limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                min="1"
                step="1"
                required
                placeholder="0"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit">{editingBudget ? "Update Budget" : "Add Budget"}</button>
            </div>
          </form>
        )}

        {budgetWithSpending.length > 0 ? (
          <div className="budgets-list">
            {budgetWithSpending.map((budget) => (
              <div key={budget.category} className="budget-card">
                <div className="budget-card-header">
                  <h3>{budget.category}</h3>
                  <div className="budget-actions">
                    <button className="icon-button" onClick={() => startEditing(budget)} aria-label="Edit budget">
                      <Edit />
                    </button>
                    <button
                      className="icon-button delete"
                      onClick={() => onDeleteBudget(budget.category)}
                      aria-label="Delete budget"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>

                <div className="budget-amounts">
                  <div className="budget-limit">
                    Budget: <span>${budget.limit.toFixed(2)}</span>
                  </div>
                  <div className="budget-spent">
                    Spent: <span>${budget.spent.toFixed(2)}</span>
                  </div>
                  <div className="budget-remaining">
                    Remaining: <span>${budget.remaining.toFixed(2)}</span>
                  </div>
                </div>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${budget.percentage}%`,
                      backgroundColor:
                        budget.percentage > 90
                          ? "var(--expense-color)"
                          : budget.percentage > 70
                            ? "orange"
                            : "var(--primary-color)",
                    }}
                  ></div>
                </div>

                <div className="budget-percentage">{budget.percentage.toFixed(0)}% used</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-budgets">
            <p>You haven't set up any budgets yet.</p>
            <p>Create a budget to track your spending by category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetTracker
