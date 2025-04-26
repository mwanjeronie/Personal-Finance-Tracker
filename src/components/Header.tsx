"use client"

import { useTheme } from "./ThemeContext"
import { Moon, Sun } from "../icons/Icons"
import "./Header.css"

interface HeaderProps {
  activeTab: "dashboard" | "transactions" | "budget"
  setActiveTab: (tab: "dashboard" | "transactions" | "budget") => void
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-content">
        <h1>Personal Finance Tracker</h1>

        <nav className="main-nav">
          <button
            className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-button ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
          <button
            className={`nav-button ${activeTab === "budget" ? "active" : ""}`}
            onClick={() => setActiveTab("budget")}
          >
            Budget
          </button>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
      </div>
    </header>
  )
}

export default Header
