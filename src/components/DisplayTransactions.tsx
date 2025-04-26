import type React from "react"

import { useState } from "react"
import type { Transaction } from "../App"
import { Trash } from "../icons/Icons"
import "./DisplayTransactions.css"

interface DisplayTransactionsProps {
  transactions: Transaction[]
  onDeleteTransaction: (id: string) => void
}

const DisplayTransactions: React.FC<DisplayTransactionsProps> = ({ transactions, onDeleteTransaction }) => {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredTransactions = transactions
    .filter((transaction) => {
      // Apply type filter
      if (filter !== "all" && transaction.type !== filter) {
        return false
      }

      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          transaction.name.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        )
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
    })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="transactions-container card">
      <div className="card-header">
        <h2 className="card-title">Transaction History</h2>
      </div>

      <div className="transactions-filters">
        <div className="filter-buttons">
          <button className={`filter-button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className={`filter-button income ${filter === "income" ? "active" : ""}`}
            onClick={() => setFilter("income")}
          >
            Income
          </button>
          <button
            className={`filter-button expense ${filter === "expense" ? "active" : ""}`}
            onClick={() => setFilter("expense")}
          >
            Expenses
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="sort-options">
        <button
          className={`sort-button ${sortBy === "date" ? "active" : ""}`}
          onClick={() => {
            if (sortBy === "date") {
              toggleSortOrder()
            } else {
              setSortBy("date")
              setSortOrder("desc")
            }
          }}
        >
          Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          className={`sort-button ${sortBy === "amount" ? "active" : ""}`}
          onClick={() => {
            if (sortBy === "amount") {
              toggleSortOrder()
            } else {
              setSortBy("amount")
              setSortOrder("desc")
            }
          }}
        >
          Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      {filteredTransactions.length > 0 ? (
        <div className="transactions-list">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-date">{formatDate(transaction.date)}</div>
              <div className="transaction-details">
                <div className="transaction-name">{transaction.name}</div>
                <div className="transaction-category">{transaction.category}</div>
              </div>
              <div className="transaction-amount">
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </div>
              <button
                className="delete-button"
                onClick={() => onDeleteTransaction(transaction.id)}
                aria-label="Delete transaction"
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          {transactions.length === 0
            ? "No transactions yet. Add your first transaction using the buttons above."
            : "No transactions match your filters."}
        </div>
      )}
    </div>
  )
}

export default DisplayTransactions
