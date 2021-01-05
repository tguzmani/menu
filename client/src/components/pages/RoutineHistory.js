import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { useParams } from 'react-router-dom'

import { readRoutines, popSession } from '../../state/routine/routineActions'
import Loading from '../layout/Loading'

import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

import dayjs from 'dayjs'

const Routine = ({ routineState, readRoutines, popSession }) => {
  const { routines, loading } = routineState
  const { id } = useParams()
  let routine = null

  const onClick = () => {
    popSession(routine)
  }

  useEffect(() => {
    if (routines.length === 0) readRoutines()
  }, [])

  if (loading) return <Loading />

  routine = routines.find(routine => routine._id === id)

  if (!routine) return <Loading />

  return (
    <div>
      <h1 className='mt-5 mb-4'>{routine.name}</h1>

      {routine.history.length > 0 ? (
        <>
          <ListGroup>
            {routine.history.map(historyItem => (
              <ListGroupItem>
                <Row>
                  <Col> {historyItem.volume} lb</Col>
                  <Col className='text-right'>
                    {dayjs(historyItem?.date).format('DD-MM-YY')}
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <Button block onClick={onClick} className='mt-3'>
            Pop Session
          </Button>
        </>
      ) : (
        'No history items for this routine...'
      )}
    </div>
  )
}

const mapActionsToProps = { readRoutines, popSession }

const mapStateToProps = state => ({
  routineState: state.routine,
  exerciseState: state.exercise,
})

export default connect(mapStateToProps, mapActionsToProps)(Routine)
