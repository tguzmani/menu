import {
  ERROR_EXERCISE,
  LOADING_EXERCISE,
  CREATE_EXERCISE,
  READ_EXERCISES,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  ADD_WEIGHT_EXERCISE,
  DELETE_WEIGHT_EXERCISE,
  MOVE_EXERCISE,
} from './exerciseTypes'

import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_EXERCISE })
}

export const createExercise = routineId => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/exercise/${routineId}`, config)
    dispatch({ type: CREATE_EXERCISE, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}

export const readExercises = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/exercise/all')
    dispatch({ type: READ_EXERCISES, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}

export const updateExercise = exercise => async dispatch => {
  // setLoading()(dispatch)
  try {
    const res = await axios.put(
      `/api/exercise/${exercise._id}`,
      exercise,
      config
    )
    dispatch({ type: UPDATE_EXERCISE, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}

export const deleteExercise = exercise => async dispatch => {
  // setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/exercise/${exercise._id}`)
    dispatch({ type: DELETE_EXERCISE, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}

export const addWeightExercise = (weight, exerciseId) => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(
      `/api/exercise/${exerciseId}/${weight._id}`,
      weight,
      config
    )
    dispatch({
      type: ADD_WEIGHT_EXERCISE,
      payload: { data: res.data, exerciseId },
    })
  } catch (error) {
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}

export const moveExercise = (exercise, direction) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/exercise/${exercise._id}/${direction}`,
      {},
      config
    )
    dispatch({
      type: MOVE_EXERCISE,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}

export const deleteWeightExercise = (
  weightId,
  exerciseId
) => async dispatch => {
  // setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/exercise/${exerciseId}/${weightId}`)
    dispatch({
      type: DELETE_WEIGHT_EXERCISE,
      payload: { data: res.data, exerciseId },
    })
  } catch (error) {
    console.log(error)
    dispatch({ type: ERROR_EXERCISE, payload: error.response.data.message })
  }
}
