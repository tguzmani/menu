import { combineReducers } from 'redux'

import authReducer from './auth/authReducer'
import routineReducer from './routine/routineReducer'
import exerciseReducer from './exercise/exerciseReducer'
import weightReducer from './weight/weightReducer'

export default combineReducers({
  auth: authReducer,
  routine: routineReducer,
  exercise: exerciseReducer,
  weight: weightReducer,
})
