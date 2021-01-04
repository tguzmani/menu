import { ERROR_AUTH, LOADING_AUTH, READ_USER, SIGN_IN } from './authTypes'
import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_AUTH })
}

export const signin = credentials => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.post('api/auth/signin', credentials, config)
    dispatch({ type: SIGN_IN, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_AUTH, payload: error.response.data.message })
  }
}

export const readUser = () => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.get(`/api/user/`)
    dispatch({ type: READ_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_AUTH, payload: error.response.data.message })
  }
}
