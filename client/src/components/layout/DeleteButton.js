import React from 'react'

import { BsFillXCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs'
import { Spinner } from 'react-bootstrap'

import useConfirmation from '../../hooks/useConfirmation'

const DeleteButton = ({ action, loading }) => {
  const [confirm, handleConfirm] = useConfirmation()

  if (loading) return <Spinner />

  return (
    <div className={`text-right ${confirm ? 'confirm' : ''}`}>
      {confirm ? (
        <BsFillExclamationCircleFill size='0.8em' onClick={action} />
      ) : (
        <BsFillXCircleFill size='0.8em' onClick={handleConfirm} />
      )}
    </div>
  )
}

export default DeleteButton
