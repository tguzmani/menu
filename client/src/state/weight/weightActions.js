import {
  ERROR_WEIGHT,
  LOADING_WEIGHT,
  CREATE_WEIGHT,
  READ_WEIGHTS,
  UPDATE_WEIGHT,
  DELETE_WEIGHT,
  READ_WEIGHT_TYPES,
} from './weightTypes'

import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_WEIGHT })
}

export const createWeight = weight => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/weight/`, weight, config)
    dispatch({ type: CREATE_WEIGHT, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_WEIGHT, payload: error.response.data.message })
  }
}

export const readWeights = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/weight/all')
    dispatch({ type: READ_WEIGHTS, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_WEIGHT, payload: error.response.data.message })
  }
}

export const updateWeight = weight => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/weight/${weight._id}`, weight, config)
    dispatch({ type: UPDATE_WEIGHT, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_WEIGHT, payload: error.response.data.message })
  }
}

export const deleteWeight = weight => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/weight/${weight._id}`)
    dispatch({ type: DELETE_WEIGHT, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_WEIGHT, payload: error.response.data.message })
  }
}

export const readWeightTypes = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/weight/types')
    dispatch({ type: READ_WEIGHT_TYPES, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_WEIGHT, payload: error.response.data.message })
  }
}
