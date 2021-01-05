import React from 'react'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Navigation = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated && (
        <Nav className='justify-content-center bg-light' activeKey='/home'>
          <Nav.Item>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/weights'>
              Weights
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, mapActionsToProps)(Navigation)
