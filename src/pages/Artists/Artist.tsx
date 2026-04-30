import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArtist, getArtistAlbums, type Album } from '../../services/spotifyService'
import type { Artist as ArtistType } from '../../types/Artists'
import AlbumCard from '../../components/AlbumCard'
import styles from './styles.module.css'

const CARD_WIDTH = 220
const GAP = 16
const STEP = 4

export default function Artist() {
  const { id } = useParams()
  const [artist, setArtist] = useState<ArtistType | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!id) return

    getArtist(id).then(setArtist).catch(console.error)

    getArtistAlbums(id)
      .then(setAlbums)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (!artist) return <p>Artista não encontrado</p>

  const offset = currentIndex * (CARD_WIDTH + GAP)
  const maxIndex = Math.max(0, albums.length - STEP)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src={artist.images?.[0]?.url} alt={artist.name} className={styles.avatar} />
        <div>
          <h1>{artist.name}</h1>
          <p className={styles.followers}>{artist.followers?.total.toLocaleString()} seguidores</p>
        </div>
      </div>

      <div className={styles.popularityBar}>
        <p>Popularidade</p>
        <div className={styles.barBg}>
          <div className={styles.barFill} style={{ width: `${artist.popularity}%` }} />
        </div>
      </div>

      <h2>Álbuns</h2>

      <div className={styles.carousel}>
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={() => setCurrentIndex((i) => Math.max(i - STEP, 0))} disabled={currentIndex === 0}>◀</button>
          <button onClick={() => setCurrentIndex((i) => Math.min(i + STEP, maxIndex))} disabled={currentIndex >= maxIndex}>▶</button>
        </div>
      </div>
    </div>
  )
}
