import React from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap'
import ExerciseItem from './ExerciseItem'

const Exercises = ({ exercises }) => {
  return (
    <ListGroup>
      {exercises.map(exercise => (
        <ExerciseItem exercise={exercise} key={exercise._id} />
      ))}
    </ListGroup>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(Exercises)
