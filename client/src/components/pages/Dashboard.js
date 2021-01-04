import React, { useEffect } from 'react'

import Routines from '../routine/Routines'

const Dashboard = () => {
  return (
    <div>
      <h1 className='font-weight-bold my-5'>Routines</h1>
      <Routines />
    </div>
  )
}

export default Dashboard
