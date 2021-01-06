import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { readWeights } from '../../state/weight/weightActions'

import { Form, Button, Col } from 'react-bootstrap'
import { addWeightExercise } from '../../state/exercise/exerciseActions'

const WeightSelector = ({
  weightState,
  readWeights,
  addWeightExercise,
  exerciseId,
  loading,
}) => {
  const { weights } = weightState

  const [number, setNumber] = useState(0)
  const [weightId, setWeightId] = useState(null)

  const onNumberChange = e => {
    setNumber(e.target.value)
  }

  const onWeightIdChange = e => {
    setWeightId(e.target.value)
    console.log(weightId)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const weight = { _id: weightId, number: parseInt(number) }
    addWeightExercise(weight, exerciseId)
  }

  useEffect(() => {
    readWeights()
  }, [readWeights])

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs={8}>
            <Form.Group>
              <Form.Label>Select weight</Form.Label>
              <Form.Control as='select' onChange={onWeightIdChange}>
                <option value={null}>Select</option>
                {weights.map(weight => (
                  <option key={weight._id} value={weight._id}>
                    {weight.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Number</Form.Label>
              <Form.Control
                name='number'
                value={number}
                onChange={onNumberChange}
                type='text'
                placeholder='Number'
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>

      <Button
        block
        disabled={number <= 0 || isNaN(number) || loading}
        onClick={handleSubmit}
      >
        {loading ? 'Adding...' : 'Add Weight'}
      </Button>
    </>
  )
}

const mapActionsToProps = { readWeights, addWeightExercise }

const mapStateToProps = state => ({ weightState: state.weight })

export default connect(mapStateToProps, mapActionsToProps)(WeightSelector)
