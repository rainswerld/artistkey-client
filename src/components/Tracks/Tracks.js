import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { indexTracks, editTrack, deleteTrack } from '../../api/artists'
import { Container, Row, Col, Button, Dropdown, ButtonGroup, DropdownButton, Modal } from 'react-bootstrap'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class Tracks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tracks: [],
      selectedTrackId: '',
      track: {
        track_name: '',
        spotify_streams: '',
        artist: this.props.match.params.artist_id
      },
      show: false
    }
  }

  componentDidMount () {
    // This has to be user in order for token authentication to take
    // match the artist_id and use that to get the tracks
    indexTracks(this.props.user, this.props.match.params.artist_id)
      .then(res => this.setState({ tracks: res.data.tracks.reverse() }))
  }

  onEditTrack = event => {
    const { msgAlert } = this.props
    editTrack(this.props.user, this.state.selectedTrackId, this.state.track)
      .then(() => this.componentDidMount())
      .then(() => this.setState({ show: false }))
      .then(() => msgAlert({
        heading: 'Updated Track',
        message: messages.updatedTrackSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  onDeleteTrack = event => {
    const { msgAlert } = this.props
    deleteTrack(this.props.user, this.state.selectedTrackId)
      .then(() => this.componentDidMount())
      .then(() => this.setState({ show: false }))
      .then(() => msgAlert({
        heading: 'Track Deleted',
        message: messages.trackDeleted,
        variant: 'success'
      }))
      .catch(console.error)
  }

  handleShow = event => {
    this.setState({ selectedTrackId: event.target.dataset.trackid })
    axios({
      url: apiUrl + '/tracks/track/' + event.target.dataset.trackid,
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ track: res.data.track }))
      .then(() => this.setState({ show: true }))
      .catch(console.error)
  }

  handleClose = () => this.setState({ show: false })

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const track = Object.assign({}, prevState.track, updatedField)
      return { track }
    })
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
          <Col md={3}>Revenue: ${track.spotify_streams * 0.0031}
          </Col>
          <div>
            <DropdownButton
              as={ButtonGroup}
              id="track-dropdown"
              size="sm"
              variant="secondary"
              title="Update Track"
            >
              <Dropdown.Item onClick={this.handleShow} data-trackid={track.id} eventKey="1">Edit</Dropdown.Item>
            </DropdownButton>
          </div>
        </Row>
      </Container>
    ))
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>Tracks:</h1>
            </Col>
            <Col>
              <Button className="float-right" href={'#/new-track/' + this.props.match.params.artist_id + '/'}>Add Track</Button>
            </Col>
          </Row>
        </Container>
        {tracks}
        <Modal centered show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="textCenter" closeButton>
            <Modal.Title className="textCenter">Edit Track</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={this.state.track.track_name} onChange={this.handleChange} name="track_name"></input>
            <input type="number" value={this.state.track.spotify_streams} onChange={this.handleChange} name="spotify_streams"></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="success" onClick={this.onEditTrack}>Save Changes</Button>
            <Button variant="danger" onClick={this.onDeleteTrack}>Delete Track</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default withRouter(Tracks)
