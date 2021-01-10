import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { readDishes } from '../../state/dish/dishActions'
import { readGroups } from '../../state/group/groupActions'

import Groups from '../group/Groups'
import DishFilter from '../dish/DishFilter'
import DishForm from '../dish/DishForm'
import GroupForm from '../group/GroupForm'

import Loading from '../layout/Loading'
import AccordionButton from '../layout/AccordionButton'

import useToggle from '../../hooks/useToggle'

const Dashboard = ({
  readDishes,
  readGroups,
  loadingDish,
  loadingGroup,
  currentGroup,
  currentDish,
  dishes,
  groups,
}) => {
  const [toggleDishForm, bindToggleDishForm, setToggleDishForm] = useToggle()
  const [toggleGroupForm, bindToggleGroupForm, setToggleGroupForm] = useToggle()

  useEffect(() => {
    readDishes()
    readGroups()
  }, [])

  useEffect(() => {
    if (currentDish) setToggleDishForm(true)
  }, [currentDish])

  useEffect(() => {
    if (currentGroup) setToggleGroupForm(true)
  }, [currentGroup])

  return (
    <div>
      <h1>Menú</h1>
      {(loadingDish || loadingGroup) &&
      (dishes.length === 0 || groups.length === 0) ? (
        <Loading />
      ) : (
        <>
          <AccordionButton
            text={
              currentGroup
                ? `Actualizar grupo (${currentGroup.name})`
                : 'Agregar grupo'
            }
            {...bindToggleGroupForm}
          />
          {toggleGroupForm && <GroupForm />}
          <AccordionButton
            text={
              currentDish
                ? `Actualizar plato (${currentDish.name})`
                : 'Agregar plato'
            }
            {...bindToggleDishForm}
          />
          {toggleDishForm && <DishForm />}
          <DishFilter />
          <Groups />
        </>
      )}
    </div>
  )
}

const mapActionsToProps = { readDishes, readGroups }

const mapStateToProps = state => ({
  loadingDish: state.dish.loading,
  loadingGroup: state.group.loading,
  currentGroup: state.group.currentGroup,
  currentDish: state.dish.currentDish,
  groups: state.group.groups,
  dishes: state.dish.dishes,
})

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
