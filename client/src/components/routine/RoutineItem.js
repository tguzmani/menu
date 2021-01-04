import React from 'react'

import { ListGroupItem } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const RoutineItem = ({ routine }) => {
  return (
    <ListGroupItem action as={Link} to={`/routines/${routine._id}`}>
      {routine.name}
    </ListGroupItem>
  )
}

export default RoutineItem
