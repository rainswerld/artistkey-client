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

export const editArtist = (user, artistId, editedArtist) => {
  console.log('this is the editedArtist ', editedArtist)
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
