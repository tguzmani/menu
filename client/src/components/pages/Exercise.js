import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { useParams } from 'react-router-dom'
import { readExercises } from '../../state/exercise/exerciseActions'
import { Button } from 'react-bootstrap'

import { readRoutines } from '../../state/routine/routineActions'
import ExerciseWeights from '../weight/ExerciseWeights'
import WeightSelector from '../weight/WeightSelector'
import Loading from '../layout/Loading'
import ExerciseForm from '../exercise/ExerciseForm'
import { totalWeight } from '../../utils/exercise'
import useToggle from '../../hooks/useToggle'
import AccordionButton from '../layout/AccordionButton'

const Exercise = ({ exerciseState, readExercises }) => {
  const { exercises, loading } = exerciseState
  const { id } = useParams()
  let exercise = null

  const [toggle, bindToggle] = useToggle()

  useEffect(() => {
    if (exercises.length === 0) readExercises()
  }, [])

  exercise = exercises.find(exercise => exercise._id === id)

  if (loading || !exercise) return <Loading />

  return (
    <div>
      <h1 className='mt-5'>{exercise.name}</h1>
      <ExerciseForm exercise={exercise} />
      <h4 className='mt-4'>Weight</h4>
      <div className='text-center'>
        <h4>{totalWeight(exercise)} lb</h4>
      </div>

      <AccordionButton text='Add Exercise' {...bindToggle} />
      {toggle && <WeightSelector exerciseId={exercise._id} />}
      <ExerciseWeights weights={exercise.weights} exerciseId={exercise._id} />
    </div>
  )
}

const mapActionsToProps = { readRoutines, readExercises }

const mapStateToProps = state => ({
  routineState: state.routine,
  exerciseState: state.exercise,
})

export default connect(mapStateToProps, mapActionsToProps)(Exercise)
