import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Home extends Component {
  constructor () {
    super()

    this.state = {

    }
  }

  render () {
    const border = {
      margin: '40px'
    }
    return (
      <section className="home">
        <h1 className="text-center home">WELCOME TO ARTISTKEY</h1>
        <h4 className="text-center sub">Please sign up or sign in</h4>
        <div style={border} className="text-center">
          <Button className="justify-content-center" variant="outline-light" href="#sign-up">SIGN UP</Button>
          <Button className="justify-content-center" variant="outline-light" href="#sign-in">SIGN IN</Button>
        </div>
      </section>
    )
  }
}

export default Home
