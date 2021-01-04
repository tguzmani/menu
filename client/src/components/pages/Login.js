import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Form, Button, Container } from 'react-bootstrap'
import { signin } from '../../state/auth/authActions'

const Login = ({ signin, isAuthenticated, history }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  useEffect(() => {
    if (isAuthenticated) history.push('/')
  }, [isAuthenticated, history])

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    signin(credentials)
  }

  const { username, password } = credentials

  return (
    <>
      <h1 className='text-center mt-5'>Exercises</h1>
      <h2 className='text-center mt-5'>Login</h2>

      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name='username'
            value={username}
            onChange={onChange}
            type='text'
            placeholder='Enter username'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            value={password}
            onChange={onChange}
            type='password'
            placeholder='Password'
          />
        </Form.Group>

        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  )
}

const mapActionsToProps = { signin }

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, mapActionsToProps)(Login)
