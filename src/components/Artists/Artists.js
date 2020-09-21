import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexArtists, editArtist, deleteArtist } from '../../api/artists'
import { Container, Row, Col, Button, DropdownButton, Dropdown, ButtonGroup, Modal } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class Artists extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artists: [],
      selectedArtistId: '',
      artist: {
        name: '',
        current_followers: '',
        current_monthly_listeners: ''
      },
      show: false
    }
  }

  componentDidMount () {
    indexArtists(this.props.user)
      .then(res => this.setState({ artists: res.data.artists.reverse() }))
  }

  onEditArtist = event => {
    const { msgAlert } = this.props
    editArtist(this.props.user, this.state.selectedArtistId, this.state.artist)
      .then(() => this.componentDidMount())
      .then(() => this.setState({ show: false }))
      .then(() => msgAlert({
        heading: 'Updated Artist',
        message: messages.updateArtistSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  onDeleteArtist = event => {
    const { msgAlert } = this.props
    deleteArtist(this.props.user, this.state.selectedArtistId)
      .then(() => this.componentDidMount())
      .then(() => this.setState({ show: false }))
      .then(() => msgAlert({
        heading: 'Artist Deleted',
        message: messages.artistDeleted,
        variant: 'success'
      }))
      .catch(console.error)
  }

  handleShow = event => {
    this.setState({ selectedArtistId: event.target.dataset.artistid })
    axios({
      url: apiUrl + '/artists/' + event.target.dataset.artistid,
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ artist: res.data.artist }))
      .then(() => this.setState({ show: true }))
      .catch(console.error)
  }

  handleClose = () => this.setState({ show: false })

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const artist = Object.assign({}, prevState.artist, updatedField)
      return { artist }
    })
  }

  render () {
    const border = {
      border: '1px solid black',
      margin: '20px',
      padding: '20px'
    }

    const artists = this.state.artists.map(artist => (
      <Container key={artist.id} style={border} className="cardHue">
        <Row>
          <Col><Link className="myFont artistLink" to={`/tracks/${artist.id}`} md={3}>{artist.name}</Link></Col>
          <Col className="myFont">Followers: {artist.current_followers}</Col>
          <Col className="myFont">Monthly Listeners: {artist.current_monthly_listeners}</Col>
        </Row>
        <Container>
          <Row md={2}>
            <Col>{artist.tracks.map(track => (
              <div key={track.id} style={border}>
                <Col className="myFont">Track: {track.track_name}</Col>
                <Col className="myFont" md={6}>Spotify Streams: {track.spotify_streams}</Col>
                <Col className="myFont" md={6}>Revenue: ${track.spotify_streams * 0.0031}</Col>
              </div>
            ))}
            </Col>
          </Row>
        </Container>
        <Col>
          <div>
            <DropdownButton
              as={ButtonGroup}
              id="artists-dropdown"
              size="sm"
              variant="outline-light"
              title="UPDATE"
            >
              <Dropdown.Item onClick={this.handleShow} data-artistid={artist.id} eventKey="1">Edit</Dropdown.Item>
              {/* <Dropdown.Item onClick={onDeleteArtist} data-artistid={artist.id} eventKey="2">Delete</Dropdown.Item> */}
            </DropdownButton>
          </div>
        </Col>
      </Container>
    ))

    return (
      <div>
        <Container>
          <Row>
            <Col md={6}>
              <h1 className="myFont artists">YOUR ARTISTS:</h1>
            </Col>
            <Col md={6}>
              <Button variant="outline-light" className="float-right artists" href="#new-artist">NEW ARTIST</Button>
            </Col>
          </Row>
        </Container>
        {artists}
        <Modal centered show={this.state.show} onHide={this.handleClose} className="myModal">
          <Modal.Header className="textCenter myFont myModal" closeButton>
            <Modal.Title className="textCenter myFont myModal">Edit Artist</Modal.Title>
          </Modal.Header>
          <Modal.Body className="myModal">
            <p className="myFont">Artist:</p>
            <input type="text" value={this.state.artist.name} onChange={this.handleChange} name="name"></input>
            <p className="myFont">Followers:</p>
            <input type="number" value={this.state.artist.current_followers} onChange={this.handleChange} name="current_followers"></input>
            <p className="myFont">Monthly Listeners:</p>
            <input type="number" value={this.state.artist.current_monthly_listeners} onChange={this.handleChange} name="current_monthly_listeners"></input>
          </Modal.Body>
          <Modal.Footer className="myModal">
            <Button variant="light" onClick={this.handleClose}>Close</Button>
            <Button variant="light" onClick={this.onEditArtist}>Save Changes</Button>
            <Button variant="outline-danger" onClick={this.onDeleteArtist}>Delete Artist</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default withRouter(Artists)
