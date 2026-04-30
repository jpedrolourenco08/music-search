import { useState, useEffect, useRef } from 'react'
import SearchBar from '../../components/SearchBar'
import MusicCard from '../../components/MusicCard'
import { searchTracks } from '../../services/spotifyService'
import type { Track } from '../../types/Track'
import style from './style.module.css'

const CARD_WIDTH = 240
const GAP = 16
const VISIBLE_CARDS = 4

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(CARD_WIDTH)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measure = () => {
      const width = (trackRef.current?.firstElementChild as HTMLElement | null)?.clientWidth
      setItemWidth(width ?? CARD_WIDTH)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [tracks.length])

  const maxIndex = Math.max(0, tracks.length - VISIBLE_CARDS)
  const offset = currentIndex * (itemWidth + GAP)

  const handleSearch = async (query: string) => {
    const results = await searchTracks(query)
    setTracks(results)
    setCurrentIndex(0)
  }

  const handleNext = () =>
    setCurrentIndex((current) =>
      Math.min(current + VISIBLE_CARDS, maxIndex)
    )

  const handlePrev = () =>
    setCurrentIndex((current) =>
      Math.max(current - VISIBLE_CARDS, 0)
    )

  return (
    <div className={style.home}>
      <h1>Bem-vindo ao Music Search 🎵</h1>
      <p>O app ideal para encontrar sua música favorita!</p>

      <SearchBar onSearch={handleSearch} />

      {tracks.length > 0 && (
        <div className={style.carousel}>
          <div className={style.viewport}>
            <div
              ref={trackRef}
              className={style.track}
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {tracks.map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          </div>

          <div className={style.controls}>
            <button onClick={handlePrev} disabled={currentIndex === 0}>◀</button>
            <button onClick={handleNext} disabled={currentIndex >= maxIndex}>▶</button>
          </div>
        </div>
      )}
    </div>
  )
}
