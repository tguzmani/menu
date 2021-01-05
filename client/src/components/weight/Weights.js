import React from 'react'
import { ListGroup } from 'react-bootstrap'
import WeightItem from './WeightItem'

const Weights = ({ weights }) => {
  return (
    <ListGroup>
      {weights.map(weight => (
        <WeightItem weight={weight} />
      ))}
    </ListGroup>
  )
}

export default Weights
