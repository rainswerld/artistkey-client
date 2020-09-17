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
