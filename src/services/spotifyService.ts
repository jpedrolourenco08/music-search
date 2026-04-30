import type { Track } from '../types/Track'
import type { Artist } from '../types/Artists'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

let accessToken: string | null = null
let tokenExpiresAt = 0

export async function getAccessToken(): Promise<string> {
  const now = Date.now()

  if (accessToken && now < tokenExpiresAt) {
    return accessToken
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    },
    body: 'grant_type=client_credentials'
  })

  const data = await res.json()

  accessToken = data.access_token
  tokenExpiresAt = now + data.expires_in * 1000

  return accessToken!
} 

export async function spotifyFetch<T>(url: string): Promise<T> {
  const token = await getAccessToken()

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error('Erro na API do Spotify')
  }

  return res.json()
}

interface SearchResponse {
  tracks: {
    items: Track[]
  }
}

export async function searchTracks(query: string): Promise<Track[]> {
  const data = await spotifyFetch<SearchResponse>(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`
  )

  return data.tracks.items
}

export async function getArtist(id: string) {
  return spotifyFetch<Artist>(
    `https://api.spotify.com/v1/artists/${id}`
  )

}  
interface AlbumsResponse {
  items: Album[]
}

export interface Album {
  id: string
  name: string
  images: { url: string }[]
  release_date: string
}

export async function getArtistAlbums(id: string): Promise<Album[]> {
  const data = await spotifyFetch<AlbumsResponse>(
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&market=US`
  )

  return data.items
}