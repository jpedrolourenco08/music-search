const CLIENT_ID = 'f6335b1352124f2aae4e2f0aea654dd9'
const CLIENT_SECRET = 'ecc1ab858b09425b9e38c559f60b9270'

async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    },
    body: 'grant_type=client_credentials'
  })

  const data = await res.json()
  return data.access_token
}

export async function searchTracks(query: string) {
  const token = await getAccessToken()

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await res.json()
  return data.tracks.items
}