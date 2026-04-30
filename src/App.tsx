import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Artist from './pages/Artists/Artist'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="app">
        <Header theme={theme} setTheme={setTheme} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/artist/:id' element={<Artist/>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App