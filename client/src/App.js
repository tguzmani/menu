import React, { Fragment } from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import { Container } from 'react-bootstrap'

// Pages
import Dashboard from './components/pages/Dashboard'
import NotFound from './components/pages/NotFound'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Container>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
