import React from 'react'

import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='text-center'>
      <Spinner animation='grow' className='my-5' variant='primary' />
    </div>
  )
}

export default Loading
