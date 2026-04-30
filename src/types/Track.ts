export interface Track {
  id: string
  name: string
  artists: { 
    id: string
    name: string 
  }[]
  album: {
    images: { url: string }[]
  }
}