import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
      <Container key={artist.id}>
        <Row style={border}>
          <Col md={4}>{artist.name}</Col>
          <Col md={4}>Followers: {artist.current_followers}</Col>
          <Col md={4}>Monthly Listeners: {artist.current_monthly_listeners}</Col>
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
              <Button href="#new-artist">Add Artist</Button>
            </Col>
          </Row>
        </Container>
        {artists}
      </div>
    )
  }
}

export default withRouter(Artists)
