import {
  ERROR_ROUTINE,
  LOADING_ROUTINE,
  CREATE_ROUTINE,
  READ_ROUTINE,
  READ_ROUTINES,
  UPDATE_ROUTINE,
  DELETE_ROUTINE,
} from './routineTypes'

const initialState = {
  loading: true,
  error: null,
  routines: [],
}

const routineReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ROUTINE:
      return { ...state, loading: true }

    case ERROR_ROUTINE:
      return { ...state, loading: false, error: action.payload }

    case CREATE_ROUTINE:
      return {
        ...state,
        loading: false,
        routines: [action.payload, ...state.routines],
      }

    case READ_ROUTINES:
      return { ...state, loading: false, routines: action.payload }

    case UPDATE_ROUTINE:
      return {
        ...state,
        loading: false,
        routines: state.routines.map(routine =>
          routine._id === action.payload._id ? action.payload : routine
        ),
      }

    case DELETE_ROUTINE:
      return {
        ...state,
        loading: false,
        routines: state.routines.filter(
          routine => routine._id !== action.payload._id
        ),
      }

    default:
      return state
  }
}

export default routineReducer
