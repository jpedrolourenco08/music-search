import type { Album } from '../services/spotifyService'
import styles from './AlbumCard.module.css'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <div className={styles.card}>
      <img src={album.images[0]?.url} alt={album.name} />
      <p className={styles.name}>{album.name}</p>
      <p className={styles.date}>{album.release_date}</p>
    </div>
  )
}
