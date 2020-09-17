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
      // .then(res => console.log(res))
      .then(res => this.setState({ artists: res.data.artists.reverse() }))
  }

  render () {
    const border = {
      border: '1px solid black',
      margin: '20px',
      padding: '20px'
    }
    // let revenue = 0
    // for (let i = 0; i < this.state.artists.tracks.length; i++) {
    //   revenue += this.state.tracks[i].spotify_streams
    //   return revenue
    // }
    const artists = this.state.artists.map(artist => (
      <Container key={artist.id}>
        <Row style={border}>
          <Link to={`/tracks/${artist.id}`} md={3}>{artist.name}</Link>
          <Col md={3}># Of Tracks Monitored: {artist.tracks.length}</Col>
          <Col md={3}>Money Earned:
          </Col>
          <Col md={3}>Followers: {artist.current_followers}</Col>
          <Col md={3}>Monthly Listeners: {artist.current_monthly_listeners}</Col>
        </Row>
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
