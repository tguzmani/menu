import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { ListGroupItem, Row, Col } from 'react-bootstrap'

import DeleteButton from '../layout/DeleteButton'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import {
  deleteExercise,
  moveExercise,
} from '../../state/exercise/exerciseActions'

const ExerciseItemEdit = ({
  exercise,
  orders,
  deleteExercise,
  moveExercise,
}) => {
  const { name, repetitions, sets, weights } = exercise

  const handleMoveDown = () => {
    moveExercise(exercise, 'moveDown')
  }

  const handleMoveUp = () => {
    moveExercise(exercise, 'moveUp')
  }

  return (
    <ListGroupItem>
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
          <Row>
            <Col>
              {exercise.order !== Math.min(...orders) && (
                <IoIosArrowUp onClick={handleMoveUp} className='my-1' />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {exercise.order !== Math.max(...orders) && (
                <IoIosArrowDown onClick={handleMoveDown} className='my-1' />
              )}
            </Col>
          </Row>
        </Col>
        <Col className='text-right'>
          <DeleteButton action={() => deleteExercise(exercise)} />
        </Col>
      </Row>
    </ListGroupItem>
  )
}

const mapActionsToProps = { deleteExercise, moveExercise }

const mapStateToProps = state => ({ exercises: state.exercise.exercises })

export default connect(mapStateToProps, mapActionsToProps)(ExerciseItemEdit)
