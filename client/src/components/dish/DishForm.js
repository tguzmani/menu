import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Col, Button } from 'react-bootstrap'
import {
  updateDish,
  createDish,
  clearCurrentDish,
  deleteDish,
} from '../../state/dish/dishActions'

import ButtonSpinner from '../layout/ButtonLoading'

const DishForm = ({
  groups,
  currentDish,
  createDish,
  updateDish,
  deleteDish,
  clearCurrentDish,
  loading,
}) => {
  const [dish, setDish] = useState({
    name: currentDish?.name || '',
    description: currentDish?.descripion || '',
    group: currentDish?.group || '',
  })

  useEffect(() => {
    if (currentDish) setDish(currentDish)
  }, [currentDish])

  const onChange = e => {
    setDish({
      ...dish,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (currentDish) {
      updateDish(dish)
      clearCurrentDish()
      setDish({ name: '', description: '', group: '' })
    } else {
      createDish(dish)
      setDish({ name: '', description: '', group: '' })
    }
  }

  const onDelete = e => {
    e.preventDefault()
    deleteDish(currentDish)
    clearCurrentDish()
    setDish({ name: '', description: '', group: '' })
  }

  const { name, description, group } = dish

  const buttonDisabled = name === '' || description === '' || group === ''

  return (
    <Form>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name='name'
              value={name}
              onChange={onChange}
              type='text'
              placeholder='Inserte nombre'
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Grupo</Form.Label>
            <Form.Control
              name='group'
              as='select'
              value={group}
              onChange={onChange}
            >
              <option>Seleccionar...</option>
              {groups.map(group => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name='description'
              value={description}
              onChange={onChange}
              type='text'
              placeholder='Inserte descripción'
            />
          </Form.Group>
        </Col>
      </Form.Row>

      <Button
        className='mb-3'
        onClick={onSubmit}
        disabled={buttonDisabled || loading}
      >
        {loading ? (
          <ButtonSpinner />
        ) : currentDish ? (
          'Actualizar plato'
        ) : (
          'Agregar Plato'
        )}
      </Button>

      {currentDish && (
        <Button
          className='mb-3 ml-2'
          onClick={onDelete}
          variant='outline-danger'
        >
          Eliminar Plato
        </Button>
      )}
    </Form>
  )
}

const mapActionsToProps = {
  createDish,
  updateDish,
  clearCurrentDish,
  deleteDish,
}

const mapStateToProps = state => ({
  groups: state.group.groups,
  loading: state.dish.loading,
  currentDish: state.dish.currentDish,
})

export default connect(mapStateToProps, mapActionsToProps)(DishForm)
