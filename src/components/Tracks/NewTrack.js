import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class NewTrack extends Component {
  constructor (props) {
    super(props)

    this.state = {
      track: {
        track_name: '',
        spotify_streams: '',
        artist: this.props.match.params.artist_id
      }
    }
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedTrack = Object.assign({}, prevState.track, updatedField)
      return { track: editedTrack }
    })
  }

  handleSubmit = event => {
    const { msgAlert, history } = this.props
    event.preventDefault()
    axios({
      url: `${apiUrl}/tracks/${this.props.match.params.artist_id}`,
      method: 'POST',
      data: { track: this.state.track },
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Track Created',
        message: messages.createdTrackSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/tracks/${this.props.match.params.artist_id}`))
      // .catch(error => {
      //   this.setState({ track_name: '', spotify_streams: '' })
      //   msgAlert({
      //     heading: 'Could Not Create Track ' + error.message,
      //     message: messages.createArtistFailed,
      //     variant: 'danger'
      //   })
      // })
  }

  render () {
    const { track } = this.state
    const { handleChange, handleSubmit } = this
    const padding = {
      padding: '10px'
    }

    return (
      <Container>
        <Row>
          <form className="new-track" onSubmit={handleSubmit}>
            <Col style={padding}>
              <h6 className="myFont">Track Name:</h6>
              <input
                placeholder='Track Name'
                value={track.track_name}
                name='track_name'
                onChange={handleChange}
              />
            </Col>
            <Col style={padding}>
              <h6 className="myFont">Spotify Streams:</h6>
              <input
                placeholder='Spotify Streams'
                value={track.spotify_streams}
                name='spotify_streams'
                onChange={handleChange}
              />
            </Col>
            <Col><Button variant="outline-light" type="submit" onSubmit={this.handleSubmit}>Create Track</Button></Col>
          </form>
        </Row>
      </Container>
    )
  }
}

export default withRouter(NewTrack)
