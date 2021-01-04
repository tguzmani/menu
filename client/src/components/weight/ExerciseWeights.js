import React from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap'
import ExerciseWeightItem from './ExerciseWeightItem'

const ExerciseWeights = ({ weights, exerciseId }) => {
  return (
    <ListGroup>
      {weights.map(weight => (
        <ExerciseWeightItem
          weight={weight}
          key={weight._id}
          exerciseId={exerciseId}
        />
      ))}
    </ListGroup>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(ExerciseWeights)
