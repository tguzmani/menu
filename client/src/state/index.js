import { combineReducers } from 'redux'

import dishReducer from '../state/dish/dishReducer'
import groupReducer from '../state/group/groupReducer'

export default combineReducers({
  dish: dishReducer,
  group: groupReducer,
})
