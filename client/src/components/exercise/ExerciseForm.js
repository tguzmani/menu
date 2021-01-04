import { set } from 'mongoose'
import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'

import { Form, Row, Col, Button } from 'react-bootstrap'
import { updateExercise } from '../../state/exercise/exerciseActions'

const ExerciseForm = ({ exercise, updateExercise }) => {
  const [exerciseData, setExerciseData] = useState({
    name: exercise.name || '',
    repetitions: exercise.repetitions || '',
    sets: exercise.sets || '',
  })

  const [dirty, setDirty] = useState(false)

  const { name, repetitions, sets } = exerciseData

  useEffect(() => {
    setDirty(
      name !== exercise.name ||
        parseInt(repetitions) !== exercise.repetitions ||
        parseInt(sets) !== exercise.sets
    )
  }, [
    name,
    repetitions,
    sets,
    exercise.name,
    exercise.repetitions,
    exercise.sets,
  ])

  const onChange = e => {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value })
  }

  const onClick = () => {
    updateExercise({ ...exerciseData, _id: exercise._id })
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Exercise name</Form.Label>
          <Form.Control
            name='name'
            value={name}
            onChange={onChange}
            type='text'
            placeholder='Exercise name'
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Sets</Form.Label>
              <Form.Control
                name='sets'
                value={sets}
                onChange={onChange}
                type='text'
                placeholder='Sets'
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Repetitions</Form.Label>
              <Form.Control
                name='repetitions'
                value={repetitions}
                onChange={onChange}
                type='text'
                placeholder='Repetitions'
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {dirty && (
        <Button block onClick={onClick}>
          Update Exercise
        </Button>
      )}
    </div>
  )
}

const mapActionsToProps = { updateExercise }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(ExerciseForm)
