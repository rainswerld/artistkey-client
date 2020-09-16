import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { indexArtists } from '../../api/artists'

class Artists extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artists: ''
    }
  }

  componentDidMount () {
    indexArtists(this.props.user)
      .then(res => console.log('this is the response: ', res))
  }

  render () {
    return (
      <h1>Hello World</h1>
    )
  }
}

export default withRouter(Artists)
