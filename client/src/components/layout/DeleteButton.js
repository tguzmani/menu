import React, { useState, useEffect } from 'react'

import { BsFillXCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs'
import { Spinner } from 'react-bootstrap'

const DeleteButton = ({ action, loading }) => {
  const [confirm, setConfirm] = useState(false)

  const handleConfirm = () => {
    setConfirm(true)
  }

  useEffect(() => {
    if (confirm)
      setTimeout(() => {
        setConfirm(false)
      }, 2500)
  }, [confirm])

  if (loading) return <Spinner />

  return (
    <div className='text-right'>
      {confirm ? (
        <BsFillExclamationCircleFill size='0.8em' onClick={action} />
      ) : (
        <BsFillXCircleFill size='0.8em' onClick={handleConfirm} />
      )}
    </div>
  )
}

export default DeleteButton
