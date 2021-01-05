import React from 'react'

import { Link } from 'react-router-dom'

import { ListGroupItem, Row, Col } from 'react-bootstrap'
import { totalWeight } from '../../utils/exercise'

const ExerciseItem = ({ exercise, offset }) => {
  const { name, repetitions, sets } = exercise

  return (
    <ListGroupItem action as={Link} to={`/exercises/${exercise._id}`}>
      <Row className='align-items-center'>
        <Col xs={8}>
          <Row>
            <Col>
              <h5>{name}</h5>
            </Col>
          </Row>
          <Row>
            <Col>{sets}x</Col>
          </Row>
        </Col>
        <Col className='text-right'>
          {repetitions + offset} x {totalWeight(exercise)} lb
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default ExerciseItem
