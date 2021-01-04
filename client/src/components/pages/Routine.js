import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { useParams } from 'react-router-dom'
import {
  createExercise,
  readExercises,
} from '../../state/exercise/exerciseActions'

import { readRoutines } from '../../state/routine/routineActions'
import Exercises from '../exercise/Exercises'
import Loading from '../layout/Loading'

import { Button } from 'react-bootstrap'

const Routine = ({
  routineState,
  exerciseState,
  createExercise,
  readExercises,
  readRoutines,
}) => {
  const { routines, loading: loadingRoutine } = routineState
  const { exercises, loading: loadingExercise } = exerciseState
  const { id } = useParams()
  let routine = null

  const onClick = () => {
    createExercise(routine._id)
  }

  useEffect(() => {
    if (routines.length === 0) readRoutines()
  }, [])

  useEffect(() => {
    if (exercises.length === 0 && routine) readExercises(routine._id)
  }, [routine])

  if (loadingRoutine || loadingExercise) return <Loading />

  routine = routines.find(routine => routine._id === id)

  if (!routine) return <Loading />

  const thisRoutineExercises = exercises.filter(
    exercise => exercise.routine === routine._id
  )

  return (
    <div>
      <h1 className='mt-5'>{routine.name}</h1>
      <Exercises exercises={thisRoutineExercises} />
      <Button block onClick={onClick}>
        Add Exercise
      </Button>
    </div>
  )
}

const mapActionsToProps = { readRoutines, readExercises, createExercise }

const mapStateToProps = state => ({
  routineState: state.routine,
  exerciseState: state.exercise,
})

export default connect(mapStateToProps, mapActionsToProps)(Routine)
