import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexArtists = user => {
  return axios({
    url: apiUrl + '/artists/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const indexTracks = (user, artistId) => {
  return axios({
    url: `${apiUrl}/tracks/${artistId}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const editTrack = (user, trackId, editedTrack) => {
  return axios({
    url: `${apiUrl}/tracks/track/${trackId}`,
    method: 'PATCH',
    data: {
      track: {
        track_name: editedTrack.track_name,
        spotify_streams: editedTrack.spotify_streams,
        artist: editedTrack.artist
      }
    },
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteTrack = (user, trackId) => {
  return axios({
    url: `${apiUrl}/tracks/${trackId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const editArtist = (user, artistId, editedArtist) => {
  return axios({
    url: `${apiUrl}/artists/${artistId}/`,
    method: 'PATCH',
    data: {
      artist: {
        name: editedArtist.name,
        current_followers: editedArtist.current_followers,
        current_monthly_listeners: editedArtist.current_monthly_listeners
      }
    },
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteArtist = (user, artistId) => {
  return axios({
    url: `${apiUrl}/artists/${artistId}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
