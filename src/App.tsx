import { useState, useEffect } from "react"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import TransactionForms from "./components/TransactionForms"
import DisplayTransactions from "./components/DisplayTransactions"
import { ThemeProvider } from "./components/ThemeContext"
import BudgetTracker from "./components/BudgetTracker"
import "./App.css"

export interface Transaction {
  id: string
  type: "income" | "expense"
  name: string
  amount: number
  date: Date
  category: string
}

export interface Budget {
  category: string
  limit: number
}

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("transactions")
    if (savedTransactions) {
      return JSON.parse(savedTransactions).map((t: any) => ({
        ...t,
        date: new Date(t.date),
      }))
    }
    return []
  })

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const savedBudgets = localStorage.getItem("budgets")
    return savedBudgets ? JSON.parse(savedBudgets) : []
  })

  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions" | "budget">("dashboard")

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets))
  }, [budgets])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions([...transactions, newTransaction])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const addBudget = (budget: Budget) => {
    setBudgets([...budgets, budget])
  }

  const updateBudget = (updatedBudget: Budget) => {
    setBudgets(budgets.map((b) => (b.category === updatedBudget.category ? updatedBudget : b)))
  }

  const deleteBudget = (category: string) => {
    setBudgets(budgets.filter((b) => b.category !== category))
  }

  return (
    <ThemeProvider>
      <div className="app-container">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="main-content">
          {activeTab === "dashboard" && <Dashboard transactions={transactions} budgets={budgets} />}

          {activeTab === "transactions" && (
            <>
              <TransactionForms onAddTransaction={addTransaction} />
              <DisplayTransactions transactions={transactions} onDeleteTransaction={deleteTransaction} />
            </>
          )}

          {activeTab === "budget" && (
            <BudgetTracker
              budgets={budgets}
              transactions={transactions}
              onAddBudget={addBudget}
              onUpdateBudget={updateBudget}
              onDeleteBudget={deleteBudget}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
