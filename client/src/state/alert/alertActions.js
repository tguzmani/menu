import { LOADING_ALERT, SET_ALERT, REMOVE_ALERT } from './alertTypes'

import { v4 as uuidv4 } from 'uuid'

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_ALERT })
}

export const setAlert = (text, variant) => dispatch => {
  const payload = {
    id: uuidv4(),
    text,
    variant,
  }

  dispatch({ type: SET_ALERT, payload })

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: payload.id })
  }, 5000)
}
