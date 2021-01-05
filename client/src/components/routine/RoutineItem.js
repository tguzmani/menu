import React from 'react'

import { ListGroupItem } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import _ from 'underscore'

import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const RoutineItem = ({ routine }) => {
  const lastRoutine = _.last(routine.history.sort((a, b) => a.date - b.date))
  const lastDate = lastRoutine?.date && dayjs(lastRoutine.date).fromNow()
  const lastVolume = lastRoutine?.date && lastRoutine.volume

  return (
    <ListGroupItem action>
      <Link to={`/routines/${routine._id}`}>
        <h4>{routine.name}</h4>
      </Link>
      {lastDate && lastVolume && (
        <Link to={`/routines/${routine?._id}/history`}>
          {lastVolume} lb <span className='text-muted'>{lastDate}</span>
        </Link>
      )}
    </ListGroupItem>
  )
}

export default RoutineItem
