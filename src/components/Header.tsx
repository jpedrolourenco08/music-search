import React from 'react'
import { Moon, Sun } from 'lucide-react'
import './Header.css'

interface HeaderProps {
  theme: string
  setTheme: (theme: string) => void
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="header">
      <h1>Music Search</h1>
      <button
        className="theme-toggle"
        aria-label="Alternar tema"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  )
}

export default Header