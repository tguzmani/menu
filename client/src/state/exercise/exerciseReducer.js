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

const initialState = {
  loading: false,
  error: null,
  exercises: [],
}

let exercises = []

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_EXERCISE:
      return { ...state, loading: true }

    case ERROR_EXERCISE:
      return { ...state, loading: false, error: action.payload }

    case CREATE_EXERCISE:
      return {
        ...state,
        loading: false,
        exercises: [...state.exercises, action.payload],
      }

    case READ_EXERCISES:
      return { ...state, loading: false, exercises: action.payload }

    case UPDATE_EXERCISE:
      return {
        ...state,
        loading: false,
        exercises: state.exercises.map(exercise =>
          exercise._id === action.payload._id ? action.payload : exercise
        ),
      }

    case DELETE_EXERCISE:
      return {
        ...state,
        loading: false,
        exercises: state.exercises.filter(
          exercise => exercise._id !== action.payload._id
        ),
      }

    case ADD_WEIGHT_EXERCISE:
      exercises = state.exercises.map(exercise => {
        return exercise._id === action.payload.exerciseId
          ? { ...exercise, weights: [action.payload.data, ...exercise.weights] }
          : exercise
      })

      return {
        ...state,
        loading: false,
        exercises,
      }

    case MOVE_EXERCISE:
      const { exercise1, exercise2 } = action.payload

      console.log(exercise1, exercise2)

      return {
        ...state,
        loading: false,
        exercises: state.exercises.map(exercise =>
          exercise._id === exercise1._id
            ? { ...exercise, order: exercise1.order }
            : exercise._id === exercise2._id
            ? { ...exercise, order: exercise2.order }
            : exercise
        ),
      }

    case DELETE_WEIGHT_EXERCISE:
      exercises = state.exercises.map(exercise => {
        return exercise._id === action.payload.exerciseId
          ? { ...exercise, weights: action.payload.data }
          : exercise
      })

      return {
        ...state,
        loading: false,
        exercises,
      }

    default:
      return state
  }
}

export default exerciseReducer
