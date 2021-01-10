import React from 'react'

import DishItem from '../dish/DishItem'

const Dishes = ({ dishes }) => {
  return (
    <div>
      {dishes.map(dish => (
        <DishItem dish={dish} key={dish._id} />
      ))}
    </div>
  )
}

export default Dishes
