import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexArtists } from '../../api/artists'
import { Container, Row, Col, Button } from 'react-bootstrap'

class Artists extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artists: []
    }
  }

  componentDidMount () {
    indexArtists(this.props.user)
      .then(res => this.setState({ artists: res.data.artists.reverse() }))
  }

  render () {
    const border = {
      border: '1px solid black',
      margin: '20px',
      padding: '20px'
    }

    const artists = this.state.artists.map(artist => (
      <Container key={artist.id} style={border}>
        <Row>
          <Link to={`/tracks/${artist.id}`} md={3}>{artist.name}</Link>
          <Col>Followers: {artist.current_followers}</Col>
          <Col>Monthly Listeners: {artist.current_monthly_listeners}</Col>
        </Row>
        <Container>
          <Row md={2}>
            <Col>{artist.tracks.map(track => (
              <div key={track.id} style={border}>
                {track.track_name}: ${track.spotify_streams * 0.0031}
              </div>
            ))}
            </Col>
          </Row>
        </Container>
      </Container>
    ))

    return (
      <div>
        <Container>
          <Row>
            <Col md={6}>
              <h1>Your Artists:</h1>
            </Col>
            <Col md={6}>
              <Button className="float-right" href="#new-artist">Add Artist</Button>
            </Col>
          </Row>
        </Container>
        {artists}
      </div>
    )
  }
}

export default withRouter(Artists)
