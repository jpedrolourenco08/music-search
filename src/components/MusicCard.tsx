import type { Track } from '../types/Track.ts'

export default function MusicCard({ track }: { track: Track }) {
  return (
    <div>
      <img src={track.album.images[0]?.url} width="100" />
      <p>{track.name}</p>
      <p>{track.artists[0].name}</p>
    </div>
  )
}