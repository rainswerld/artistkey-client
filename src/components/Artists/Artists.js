import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { indexArtists } from '../../api/artists'

class Artists extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artists: []
    }
  }

  componentDidMount () {
    indexArtists(this.props.user)
      .then(res => this.setState({ artists: res.data.artists }))
  }

  render () {
    const artists = this.state.artists.map(artist => (
      <React.Fragment key={artist.id}>
        <h1>Artist: {artist.name}</h1>
        <h3>Followers: {artist.current_followers}</h3>
        <h3>Monthly Listeners: {artist.current_monthly_listeners}</h3>
      </React.Fragment>
    ))
    return (
      <div>
        {artists}
      </div>
    )
  }
}

export default withRouter(Artists)
