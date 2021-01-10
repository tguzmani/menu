import React from 'react'
import { connect } from 'react-redux'

import GroupItem from '../group/GroupItem'

const Groups = ({ dishState, groups }) => {
  const { filteredDishes, dishes } = dishState

  const dishesToDisplay = filteredDishes ? filteredDishes : dishes

  const dishesByGroup = groupId =>
    dishesToDisplay.filter(dish => dish.group === groupId)

  return (
    <div>
      {groups.map(group => (
        <GroupItem group={group} dishes={dishesByGroup(group._id)} />
      ))}
    </div>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({
  dishState: state.dish,
  groups: state.group.groups,
})

export default connect(mapStateToProps, mapActionsToProps)(Groups)
