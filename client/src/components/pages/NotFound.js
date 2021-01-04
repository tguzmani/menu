import React from 'react'

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='text-center'>
      <h1 className='font-weight-bold mt-5'>404</h1>
      <h2 className='mb-5'>Not found :(</h2>
      <Link to='/'>Go back</Link>
    </div>
  )
}

export default NotFound
