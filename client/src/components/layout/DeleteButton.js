import React, { useState } from 'react'

import { BsFillXCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs'
import { Spinner } from 'react-bootstrap'

import useConfirmation from '../../hooks/useConfirmation'

const DeleteButton = ({ action }) => {
  const [confirm, handleConfirm] = useConfirmation()

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
