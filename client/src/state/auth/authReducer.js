import { ERROR_AUTH, LOADING_AUTH, READ_USER, SIGN_IN } from './authTypes'

const initialState = {
  loading: true,
  error: null,
  isAuthenticated: false,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_AUTH:
      return { ...state, loading: true }

    case SIGN_IN:
      return { ...state, loading: false, isAuthenticated: true }

    case READ_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        user: action.payload,
        isAuthenticated: true,
      }

    case ERROR_AUTH:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default authReducer
