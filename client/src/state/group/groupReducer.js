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

const initialState = {
  loading: false,
  error: null,
  groups: [],
  currentGroup: null,
}

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_GROUP:
      return { ...state, loading: true }

    case ERROR_GROUP:
      return { ...state, loading: false, error: action.payload }

    case CREATE_GROUP:
      return {
        ...state,
        loading: false,
        groups: [action.payload, ...state.groups],
      }

    case READ_GROUPS:
      return { ...state, loading: false, groups: action.payload }

    case UPDATE_GROUP:
      return {
        ...state,
        loading: false,
        groups: state.groups.map(group =>
          group._id === action.payload._id ? action.payload : group
        ),
      }

    case DELETE_GROUP:
      return {
        ...state,
        loading: false,
        groups: state.groups.filter(group => group._id !== action.payload._id),
      }

    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      }

    case CLEAR_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: null,
      }

    default:
      return state
  }
}

export default groupReducer
