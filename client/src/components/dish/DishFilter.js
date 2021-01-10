import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Form } from 'react-bootstrap'
import { clearFilter, filterDishes } from '../../state/dish/dishActions'

const DishFilter = ({ clearFilter, filterDishes }) => {
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (filter === '') clearFilter()
    else filterDishes(filter)
  }, [filter])

  const onChange = e => {
    setFilter(e.target.value)
  }

  return (
    <Form className='mt-4 pb-1'>
      <Form.Group>
        <Form.Label>Filtrar platos</Form.Label>
        <Form.Control
          name='filter'
          value={filter}
          onChange={onChange}
          type='text'
          placeholder='Inserte filtro...'
        />
      </Form.Group>
    </Form>
  )
}

const mapActionsToProps = { clearFilter, filterDishes }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(DishFilter)
