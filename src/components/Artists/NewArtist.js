import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class NewArtist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artist: {
        name: '',
        current_followers: '',
        current_monthly_listeners: ''
      }
    }
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedArtist = Object.assign({}, prevState.artist, updatedField)
      return { artist: editedArtist }
    })
  }

  handleSubmit = event => {
    const { history, msgAlert } = this.props

    event.preventDefault()
    axios({
      url: `${apiUrl}/artists/`,
      method: 'POST',
      data: { artist: this.state.artist },
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Artist Created',
        message: messages.createdArtistSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/artists/'))
      .catch(error => {
        this.setState({ name: '', current_followers: '', current_monthly_listeners: '' })
        msgAlert({
          heading: 'Could Not Create Artist ' + error.message,
          message: messages.createArtistFailed,
          variant: 'danger'
        })
      })
  }

  render () {
    const { artist } = this.state
    const { handleChange, handleSubmit } = this
    const padding = {
      padding: '10px'
    }

    return (
      <Container>
        <Row>
          <form className="new-artist" onSubmit={handleSubmit}>
            <Col style={padding}>
              <h6>Artist Name:</h6>
              <input
                placeholder='Artist Name'
                value={artist.name}
                name='name'
                onChange={handleChange}
              />
            </Col>
            <Col style={padding}>
              <h6>Current Follower Count:</h6>
              <input
                placeholder='Current Follower Count'
                value={artist.current_followers}
                name='current_followers'
                onChange={handleChange}
              />
            </Col>
            <Col style={padding}>
              <h6>Current Monthly Listeners:</h6>
              <input
                placeholder='Current Follower Count'
                value={artist.current_monthly_listeners}
                name='current_monthly_listeners'
                onChange={handleChange}
              />
            </Col>
            <Col><Button type="submit">Create Artist</Button></Col>
          </form>
        </Row>
      </Container>
    )
  }
}

export default withRouter(NewArtist)
