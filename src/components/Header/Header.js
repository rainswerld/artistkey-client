import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment className="navBar myFont">
    <Nav.Link href="#artists">ARTISTS</Nav.Link>
    <Nav.Link href="#change-password">CHANGE PASSWORD</Nav.Link>
    <Nav.Link href="#sign-out">SIGNOUT</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up" className="myFont">SIGN UP</Nav.Link>
    <Nav.Link href="#sign-in" className="myFont">SIGN IN</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar className="navBar myFont" variant="dark" expand="md">
    <Navbar.Brand className="myFont" href="#">
      ARTISTKEY
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto navBar myFont">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* alwaysOptions */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
