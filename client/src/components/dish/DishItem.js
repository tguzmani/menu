import React from 'react'
import { connect } from 'react-redux'
import { setCurrentDish } from '../../state/dish/dishActions'

const DishItem = ({ dish, setCurrentDish }) => {
  const onClick = () => {
    setCurrentDish(dish)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div>
        <h5 className='clickable' onClick={onClick}>
          {dish.name}
        </h5>
      </div>
      <div>
        <p>{dish.description}</p>
      </div>
    </div>
  )
}

const mapActionsToProps = { setCurrentDish }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(DishItem)
