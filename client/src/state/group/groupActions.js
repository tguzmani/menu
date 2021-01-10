import {
  ERROR_GROUP,
  LOADING_GROUP,
  CREATE_GROUP,
  SET_CURRENT_GROUP,
  CLEAR_CURRENT_GROUP,
  READ_GROUPS,
  UPDATE_GROUP,
  DELETE_GROUP,
} from './groupTypes'

import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_GROUP })
}

export const createGroup = group => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/group/`, group, config)
    dispatch({ type: CREATE_GROUP, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_GROUP, payload: error.response.data.message })
  }
}

export const readGroups = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/group/all')
    dispatch({ type: READ_GROUPS, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_GROUP, payload: error.response.data.message })
  }
}

export const updateGroup = group => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/group/${group._id}`, group, config)
    dispatch({ type: UPDATE_GROUP, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_GROUP, payload: error.response.data.message })
  }
}

export const deleteGroup = group => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/group/${group._id}`)
    dispatch({ type: DELETE_GROUP, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_GROUP, payload: error.response.data.message })
  }
}

export const setCurrentGroup = group => dispatch => {
  dispatch({ type: SET_CURRENT_GROUP, payload: group })
}

export const clearCurrentGroup = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_GROUP })
}
