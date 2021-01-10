import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Col, Button } from 'react-bootstrap'
import {
  updateGroup,
  createGroup,
  clearCurrentGroup,
  deleteGroup,
} from '../../state/group/groupActions'
import useConfirmation from '../../hooks/useConfirmation'

import ButtonSpinner from '../layout/ButtonLoading'

const GroupForm = ({
  currentGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  clearCurrentGroup,
  loading,
}) => {
  const [group, setGroup] = useState({
    name: currentGroup?.name || '',
    description: currentGroup?.descripion || '',
  })

  const [confirm, handleConfirm] = useConfirmation()

  useEffect(() => {
    if (currentGroup) setGroup(currentGroup)
  }, [currentGroup])

  const onChange = e => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (currentGroup) {
      updateGroup(group)
      clearCurrentGroup()
      setGroup({ name: '', descripion: '' })
    } else {
      createGroup(group)
      setGroup({ name: '', descripion: '' })
    }
  }

  const onDelete = e => {
    e.preventDefault()
    deleteGroup(currentGroup)
    clearCurrentGroup()
    setGroup({ name: '', descripion: '' })
  }

  const { name, description } = group

  const buttonDisabled = name === '' || description === ''

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
        ) : currentGroup ? (
          'Actualizar grupo'
        ) : (
          'Agregar grupo'
        )}
      </Button>

      {currentGroup &&
        (confirm ? (
          <Button
            className='mb-3 ml-2'
            onClick={onDelete}
            variant='outline-danger'
          >
            Confirmar eliminación
          </Button>
        ) : (
          <Button
            className='mb-3 ml-2'
            onClick={handleConfirm}
            variant='outline-danger'
          >
            Eliminar Grupo
          </Button>
        ))}

      {confirm && (
        <div className='text-danger mb-3'>
          Al eliminar un grupo, se eliminarán todos los platos asociados al
          mismo
        </div>
      )}
    </Form>
  )
}

const mapActionsToProps = {
  createGroup,
  updateGroup,
  clearCurrentGroup,
  deleteGroup,
}

const mapStateToProps = state => ({
  groups: state.group.groups,
  loading: state.group.loading,
  currentGroup: state.group.currentGroup,
})

export default connect(mapStateToProps, mapActionsToProps)(GroupForm)
