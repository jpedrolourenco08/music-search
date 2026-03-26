import { useState } from 'react'
import SearchBar from '../components/SearchBar.tsx'
import MusicCard from '../components/MusicCard.tsx'
import { searchTracks } from '../services/spotifyService.ts'
import type { Track } from '../types/Track.ts'

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([])

  const handleSearch = async (query: string) => {
    const results = await searchTracks(query)
    setTracks(results)
  }

  return (
    <div>
      <h1>Bem-vindo ao Music Search 🎵</h1>
      <h3>O app ideal para encontrar sua música favorita!</h3>

      <SearchBar onSearch={handleSearch} />

      <div>
        {tracks.map((track) => (
          <MusicCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}