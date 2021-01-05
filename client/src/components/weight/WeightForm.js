import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form } from 'react-bootstrap'

import { capitalize } from '../../utils'

import { createWeight } from '../../state/weight/weightActions'

import { weightTypes } from '../../utils/constants'

const WeightForm = ({ createWeight }) => {
  const [weight, setWeight] = useState({
    name: '',
    value: '',
    type: '',
  })

  const onChange = e => {
    setWeight({ ...weight, [e.target.name]: e.target.value })
    console.log(weight)
  }

  const handleSubmit = e => {
    e.preventDefault()
    createWeight(weight)
  }

  const { name, value, type } = weight

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                value={name}
                onChange={onChange}
                type='text'
                placeholder='Name'
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control
                name='value'
                value={value}
                onChange={onChange}
                type='number'
                placeholder='Number'
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Select weight</Form.Label>
              <Form.Control as='select' onChange={onChange} name='type'>
                <option value={null}>Select</option>
                {weightTypes.map(type => (
                  <option key={type} value={type}>
                    {capitalize(type)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>

      <Button
        block
        disabled={type === 'Select' || name === '' || value === ''}
        onClick={handleSubmit}
      >
        Add Weight
      </Button>
    </>
  )
}

const mapActionsToProps = { createWeight }

const mapStateToProps = state => ({ types: state.weight.types })

export default connect(mapStateToProps, mapActionsToProps)(WeightForm)
