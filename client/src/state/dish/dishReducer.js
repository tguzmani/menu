import {
  ERROR_DISH,
  LOADING_DISH,
  CREATE_DISH,
  FILTER_DISHES,
  CLEAR_FILTER,
  READ_DISHES,
  UPDATE_DISH,
  DELETE_DISH,
  CLEAR_CURRENT_DISH,
  SET_CURRENT_DISH,
} from './dishTypes'

const initialState = {
  loading: false,
  error: null,
  dishes: [],
  currentDish: null,
  filteredDishes: null,
}

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DISH:
      return { ...state, loading: true }

    case ERROR_DISH:
      return { ...state, loading: false, error: action.payload }

    case CREATE_DISH:
      return {
        ...state,
        loading: false,
        dishes: [action.payload, ...state.dishes],
      }

    case READ_DISHES:
      return { ...state, loading: false, dishes: action.payload }

    case UPDATE_DISH:
      return {
        ...state,
        loading: false,
        dishes: state.dishes.map(dish =>
          dish._id === action.payload._id ? action.payload : dish
        ),
      }

    case DELETE_DISH:
      return {
        ...state,
        loading: false,
        dishes: state.dishes.filter(dish => dish._id !== action.payload._id),
      }

    case FILTER_DISHES:
      return {
        ...state,
        filteredDishes: state.dishes.filter(dish => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return dish.name.match(regex)
        }),
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filteredDishes: null,
      }

    case SET_CURRENT_DISH:
      return {
        ...state,
        currentDish: action.payload,
      }

    case CLEAR_CURRENT_DISH:
      return {
        ...state,
        currentDish: null,
      }

    default:
      return state
  }
}

export default dishReducer
