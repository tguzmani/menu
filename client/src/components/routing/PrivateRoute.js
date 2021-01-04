import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { readUser } from '../../state/auth/authActions'

const PrivateRoute = ({
  readUser,
  isAuthenticated,
  loading,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    readUser()
  }, [])

  const condition = !isAuthenticated && !loading

  return (
    <Route
      {...rest}
      render={props =>
        condition ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  )
}

const mapActionsToProps = { readUser }

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
})

export default connect(mapStateToProps, mapActionsToProps)(PrivateRoute)
