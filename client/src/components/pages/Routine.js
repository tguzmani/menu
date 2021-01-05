import React, { useEffect, useState } from 'react'
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

import { GoPencil } from 'react-icons/go'
import { FaCheckCircle } from 'react-icons/fa'

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

  const [editing, setEditing] = useState(false)
  const [success, setSuccess] = useState(false)

  const onClick = () => {
    createExercise(routine._id)
  }

  const handleSuccess = () => {
    console.log('Success!')
    setSuccess(true)
  }

  useEffect(() => {
    if (exercises.length === 0) readExercises()
    if (routines.length === 0) readRoutines()
  }, [])

  if (loadingRoutine || loadingExercise) return <Loading />

  routine = routines.find(routine => routine._id === id)

  if (!routine) return <Loading />

  const thisRoutineExercises = exercises.filter(
    exercise => exercise.routine === routine._id
  )

  return (
    <div>
      <h1 className='mt-5'>{routine.name}</h1>

      <div className='text-right mt-4 mb-2'>
        {editing ? (
          <>
            Editing...
            <FaCheckCircle className='ml-1' onClick={() => setEditing(false)} />
          </>
        ) : (
          <>
            Edit <GoPencil className='ml-1' onClick={() => setEditing(true)} />
          </>
        )}
      </div>
      <Exercises
        exercises={thisRoutineExercises}
        editing={editing}
        offset={routine.history.length % 3}
      />

      {editing ? (
        <Button block onClick={onClick} className='mt-3'>
          Add Exercise
        </Button>
      ) : (
        <Button
          className='mt-3'
          block
          disabled={success}
          onClick={handleSuccess}
          variant={success ? 'success' : 'outline-success'}
        >
          {success ? 'Success' : 'Mark as done'}
        </Button>
      )}
    </div>
  )
}

const mapActionsToProps = { readRoutines, readExercises, createExercise }

const mapStateToProps = state => ({
  routineState: state.routine,
  exerciseState: state.exercise,
})

export default connect(mapStateToProps, mapActionsToProps)(Routine)
