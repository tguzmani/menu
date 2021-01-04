import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

import { readRoutines } from '../../state/routine/routineActions'

import RoutineItem from './RoutineItem'
import Loading from '../layout/Loading'

const Routines = ({ routineState, readRoutines }) => {
  const { routines, loading } = routineState

  useEffect(() => {
    if (routines.length === 0) readRoutines()
  }, [])

  if (loading) return <Loading />

  return (
    <ListGroup>
      {routines.map(routine => (
        <RoutineItem key={routine._id} routine={routine} />
      ))}
    </ListGroup>
  )
}

const mapActionsToProps = { readRoutines }

const mapStateToProps = state => ({ routineState: state.routine })

export default connect(mapStateToProps, mapActionsToProps)(Routines)
