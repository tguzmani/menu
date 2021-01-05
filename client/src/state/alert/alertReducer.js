import {
  ERROR_ALERT,
  LOADING_ALERT,
  SET_ALERT,
  REMOVE_ALERT,
} from './alertTypes'

const initialState = { loading: false, error: null, alerts: [] }

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] }

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload),
      }

    case LOADING_ALERT:
      return { ...state, loading: true }

    case ERROR_ALERT:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default alertReducer
