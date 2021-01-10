import {
  ERROR_DISH,
  LOADING_DISH,
  CREATE_DISH,
  CLEAR_FILTER,
  FILTER_DISHES,
  READ_DISHES,
  UPDATE_DISH,
  DELETE_DISH,
  CLEAR_CURRENT_DISH,
  SET_CURRENT_DISH,
} from './dishTypes'

import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_DISH })
}

export const createDish = dish => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/dish/`, dish, config)
    dispatch({ type: CREATE_DISH, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_DISH, payload: error.response.data.message })
  }
}

export const readDishes = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/dish/all')
    dispatch({ type: READ_DISHES, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_DISH, payload: error.response.data.message })
  }
}

export const updateDish = dish => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/dish/${dish._id}`, dish, config)
    dispatch({ type: UPDATE_DISH, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_DISH, payload: error.response.data.message })
  }
}

export const deleteDish = dish => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/dish/${dish._id}`)
    dispatch({ type: DELETE_DISH, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_DISH, payload: error.response.data.message })
  }
}

export const filterDishes = text => dispatch => {
  dispatch({ type: FILTER_DISHES, payload: text })
}

export const clearFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER })
}

export const setCurrentDish = dish => dispatch => {
  dispatch({ type: SET_CURRENT_DISH, payload: dish })
}

export const clearCurrentDish = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_DISH })
}
