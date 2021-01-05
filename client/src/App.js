import React, { Fragment } from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import { Container } from 'react-bootstrap'

import PrivateRoute from './components/routing/PrivateRoute'

// Layout
import Navigation from './components/layout/Navigation'

// Pages
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import Routine from './components/pages/Routine'
import Exercise from './components/pages/Exercise'
import NotFound from './components/pages/NotFound'
import WeightsPage from './components/pages/WeightsPage'
import Test from './components/pages/Test'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Container>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/routines/:id' component={Routine} />
              <PrivateRoute exact path='/weights' component={WeightsPage} />
              <PrivateRoute exact path='/weights/:id' component={Routine} />
              <PrivateRoute exact path='/exercises/:id' component={Exercise} />
              <PrivateRoute exact path='/test' component={Test} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Container>
          <Navigation />
          <div className='spacer'>.</div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
