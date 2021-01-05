import React from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap'
import ExerciseItem from './ExerciseItem'
import ExerciseItemEdit from './ExerciseItemEdit'

const Exercises = ({ exercises, offset, editing }) => {
  const orders = exercises.map(exercise => exercise.order)

  return (
    <ListGroup>
      {exercises.map(exercise =>
        editing ? (
          <ExerciseItemEdit
            exercise={exercise}
            key={exercise._id}
            offset={offset}
            orders={orders}
          />
        ) : (
          <ExerciseItem
            exercise={exercise}
            key={exercise._id}
            offset={offset}
          />
        )
      )}
    </ListGroup>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(Exercises)
