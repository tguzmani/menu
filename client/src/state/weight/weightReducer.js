import { 
  ERROR_WEIGHT, 
  LOADING_WEIGHT,
  CREATE_WEIGHT,
  READ_WEIGHT,
  READ_WEIGHTS,
  UPDATE_WEIGHT,
  DELETE_WEIGHT,
} from './weightTypes'

const initialState = { 
  loading: false, 
  error: null, 
  weights: [],
}

const weightReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_WEIGHT:
      return { ...state, loading: true }

    case ERROR_WEIGHT:
      return { ...state, loading: false, error: action.payload }

    case CREATE_WEIGHT:
      return {
        ...state,
        loading: false,
        weights: [action.payload, ...state.weights],
      }

    case READ_WEIGHTS:
      return { ...state, loading: false, weights: action.payload }

    case UPDATE_WEIGHT:
      return {
        ...state,
        loading: false,
        weights: state.weights.map(weight =>
          weight._id === action.payload._id ? action.payload : weight
        ),
      }

    case DELETE_WEIGHT:
      return {
        ...state,
        loading: false,
        weights: state.weights.filter(
          weight => weight._id !== action.payload._id
        ),
      }

    default:
      return state
  }
}

export default weightReducer

