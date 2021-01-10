import React from 'react'
import { Spinner } from 'react-bootstrap'

const ButtonLoading = () => {
  return (
    <div className='text-center'>
      <Spinner variant='light' animation='grow' size='sm' className='mr-2' />
      Cargando
    </div>
  )
}

export default ButtonLoading
