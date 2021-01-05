import React from 'react'

const AccordionButton = ({ text, toggle, onClick }) => {
  const buttonText = toggle ? `▾ ${text}` : `▸ ${text}`
  return (
    <h5 className='clickable' onClick={onClick}>
      {buttonText}
    </h5>
  )
}

export default AccordionButton
