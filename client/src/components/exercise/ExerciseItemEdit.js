import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { ListGroupItem, Row, Col } from 'react-bootstrap'

import DeleteButton from '../layout/DeleteButton'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { deleteExercise } from '../../state/exercise/exerciseActions'

const ExerciseItemEdit = ({ exercise, orders, deleteExercise }) => {
  const { name, repetitions, sets, weights } = exercise

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
                <IoIosArrowUp className='my-1' />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {exercise.order !== Math.max(...orders) && (
                <IoIosArrowDown className='my-1' />
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

const mapActionsToProps = { deleteExercise }

const mapStateToProps = state => ({ exercises: state.exercise.exercises })

export default connect(mapStateToProps, mapActionsToProps)(ExerciseItemEdit)
