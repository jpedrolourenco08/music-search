import { useNavigate } from 'react-router-dom'
import type { Track } from '../types/Track'
import styles from './MusicCard.module.css'

export default function MusicCard({ track }: { track: Track }) {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/artist/${track.artists[0].id}`)}>
      <img src={track.album.images[0]?.url} alt={track.name} />
      <p className={styles.name}>{track.name}</p>
      <p className={styles.artist}>{track.artists[0].name}</p>
    </div>
  )
}
