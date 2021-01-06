import React from 'react'
import { connect } from 'react-redux'

import { ListGroupItem, Row, Col } from 'react-bootstrap'
import DeleteButton from '../layout/DeleteButton'
import { deleteWeightExercise } from '../../state/exercise/exerciseActions'

const ExerciseWeightItem = ({ weight, exerciseId, deleteWeightExercise }) => {
  const {
    weight: { name, value, type },
    number,
  } = weight

  return (
    <ListGroupItem action>
      <Row>
        <Col xs={5}>{name}</Col>
        <Col>
          {number} x {value} lb
        </Col>
        <Col>
          <DeleteButton
            action={() => deleteWeightExercise(weight.weight._id, exerciseId)}
          />
        </Col>
      </Row>
    </ListGroupItem>
  )
}

const mapActionsToProps = { deleteWeightExercise }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(ExerciseWeightItem)
