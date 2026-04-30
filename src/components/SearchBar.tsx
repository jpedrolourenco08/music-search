import { useState } from 'react'
import { Search } from 'lucide-react'
import './SearchBar.css'

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    onSearch(query)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar música..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" type="submit" aria-label="Buscar">
        <Search size={18} />
      </button>
    </form>
  )
}