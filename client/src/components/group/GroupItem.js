import React from 'react'
import { connect } from 'react-redux'
import { setCurrentGroup } from '../../state/group/groupActions'

import Dishes from '../dish/Dishes'

const GroupItem = ({ group, dishes, setCurrentGroup, filteredDishes }) => {
  const onClick = () => {
    setCurrentGroup(group)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <>
      {filteredDishes ? (
        dishes.length > 0 && (
          <>
            <h2 className='clickable' onClick={onClick}>
              {group.name}
            </h2>
            <Dishes dishes={dishes} />
          </>
        )
      ) : (
        <>
          <div className='group-header'>
            <h2 className='clickable' onClick={onClick}>
              {group.name}
            </h2>
            <p>{group.description}</p>
          </div>
          {dishes.length > 0 ? (
            <Dishes dishes={dishes} />
          ) : (
            <p>No hay platos en este grupo...</p>
          )}
        </>
      )}
    </>
  )
}

const mapActionsToProps = { setCurrentGroup }

const mapStateToProps = state => ({ filteredDishes: state.dish.filteredDishes })

export default connect(mapStateToProps, mapActionsToProps)(GroupItem)
