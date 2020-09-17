import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { indexTracks } from '../../api/artists'
import { Container, Row, Col } from 'react-bootstrap'

class Tracks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tracks: []
    }
  }

  componentDidMount () {
    // This has to be user in order for token authentication to take
    // match the artist_id and use that to get the tracks
    indexTracks(this.props.user, this.props.match.params.artist_id)
      .then(res => this.setState({ tracks: res.data.tracks.reverse() }))
  }

  render () {
    const border = {
      border: '1px solid black',
      margin: '20px',
      padding: '20px'
    }

    const tracks = this.state.tracks.map(track => (
      <Container key={track.id}>
        <Row style={border}>
          <Col md={3}>Track: {track.track_name}
          </Col>
          <Col md={3}>Streams: {track.spotify_streams}
          </Col>
        </Row>
      </Container>
    ))
    return (
      <Container>
        <Row>
          <Col>
            {tracks}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Tracks)
