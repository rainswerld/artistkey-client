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
