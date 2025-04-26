import { useMemo } from "react"
import type { Transaction, Budget } from "../App"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
import "./Dashboard.css"

interface DashboardProps {
  transactions: Transaction[]
  budgets: Budget[]
}

const Dashboard = ({ transactions, budgets }: DashboardProps) => {
  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  )

  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  )

  const balance = totalIncome - totalExpenses

  // Get expense data by category for pie chart
  const expensesByCategory = useMemo(() => {
    const categories: Record<string, number> = {}

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (categories[t.category]) {
          categories[t.category] += t.amount
        } else {
          categories[t.category] = t.amount
        }
      })

    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }, [transactions])

  // Get monthly data for bar chart
  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {}

    transactions.forEach((t) => {
      const date = new Date(t.date)
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`

      if (!months[monthYear]) {
        months[monthYear] = { income: 0, expense: 0 }
      }

      if (t.type === "income") {
        months[monthYear].income += t.amount
      } else {
        months[monthYear].expense += t.amount
      }
    })

    return Object.entries(months)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split("/").map(Number)
        const [bMonth, bYear] = b.month.split("/").map(Number)

        if (aYear !== bYear) return aYear - bYear
        return aMonth - bMonth
      })
      .slice(-6) // Last 6 months
  }, [transactions])

  // Budget vs actual spending
  const budgetComparison = useMemo(() => {
    return budgets.map((budget) => {
      const spent = transactions
        .filter((t) => t.type === "expense" && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0)

      const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0

      return {
        category: budget.category,
        limit: budget.limit,
        spent,
        percentage: Math.min(percentage, 100),
        remaining: Math.max(budget.limit - spent, 0),
      }
    })
  }, [transactions, budgets])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="dashboard">
      <div className="grid">
        <div className="card summary-card">
          <h2>Summary</h2>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-label">Balance</span>
              <span className={`stat-value ${balance >= 0 ? "text-income" : "text-expense"}`}>
                ${balance.toFixed(2)}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Income</span>
              <span className="stat-value text-income">${totalIncome.toFixed(2)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Expenses</span>
              <span className="stat-value text-expense">${totalExpenses.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Expenses by Category</h2>
          {expensesByCategory.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="no-data">No expense data available</p>
          )}
        </div>
      </div>

      <div className="card">
        <h2>Monthly Income vs Expenses</h2>
        {monthlyData.length > 0 ? (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#4CAF50" />
                <Bar dataKey="expense" name="Expense" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="no-data">No monthly data available</p>
        )}
      </div>

      {budgets.length > 0 && (
        <div className="card">
          <h2>Budget Status</h2>
          <div className="budget-status">
            {budgetComparison.map((budget, index) => (
              <div key={index} className="budget-item">
                <div className="budget-header">
                  <span className="budget-category">{budget.category}</span>
                  <span className="budget-figures">
                    ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                  </span>
                </div>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${budget.percentage}%`,
                      backgroundColor: budget.percentage > 90 ? "var(--expense-color)" : "var(--primary-color)",
                    }}
                  ></div>
                </div>
                <div className="budget-footer">
                  <span className="budget-percentage">{budget.percentage.toFixed(0)}%</span>
                  <span className="budget-remaining">${budget.remaining.toFixed(2)} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <div className="card empty-state">
          <h2>Welcome to Your Personal Finance Tracker!</h2>
          <p>Start by adding your income and expenses in the Transactions tab.</p>
          <p>Set up budgets in the Budget tab to track your spending goals.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
