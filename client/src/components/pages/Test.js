import React from 'react'
import useToggle from '../../hooks/useToggle'

import AccordionButton from '../layout/AccordionButton'

const Test = () => {
  const [toggle, bindToggle] = useToggle()

  return (
    <div>
      <AccordionButton {...bindToggle} />
      {toggle ? 'hola' : 'chao'}
    </div>
  )
}

export default Test
