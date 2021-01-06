import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

import { readRoutines } from '../../state/routine/routineActions'
import { readExercises } from '../../state/exercise/exerciseActions'
import { readWeights, readWeightTypes } from '../../state/weight/weightActions'

import RoutineItem from './RoutineItem'
import Loading from '../layout/Loading'

const Routines = ({
  routineState,
  readRoutines,
  readExercises,
  readWeights,
  readWeightTypes,
  exercises,
  weights,
  types,
}) => {
  const { routines, loading } = routineState

  useEffect(() => {
    if (routines.length === 0) readRoutines()
    if (exercises.length === 0) readExercises()
    if (weights.length === 0) readWeights()
    if (types.length === 0) readWeightTypes()
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

const mapActionsToProps = {
  readRoutines,
  readExercises,
  readWeights,
  readWeightTypes,
}

const mapStateToProps = state => ({
  routineState: state.routine,
  exercises: state.exercise.exercises,
  weights: state.weight.weights,
  types: state.weight.types,
})

export default connect(mapStateToProps, mapActionsToProps)(Routines)
