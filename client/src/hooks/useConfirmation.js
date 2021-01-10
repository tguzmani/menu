import { useState, useEffect } from 'react'

const useConfirmation = (timeout = 2500) => {
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    if (confirm)
      setTimeout(() => {
        setConfirm(false)
      }, timeout)
  }, [confirm, timeout])

  const handleConfirm = () => {
    setConfirm(true)
  }

  return [confirm, handleConfirm]
}

export default useConfirmation
