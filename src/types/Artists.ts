export interface Artist {
  id: string
  name: string
  popularity: number
  images: { url: string }[]
  followers: {
    total: number
  }
  genres: string[]
}