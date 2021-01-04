const fs = require('fs')

if (!process.argv[2] || !process.argv[3]) {
  console.error('There must be a model name in singular and plural form')
  process.exit(1)
}

const modelName = process.argv[2]
const modelNamePlural = process.argv[3]
const modelNameLowerCase = modelName.toLocaleLowerCase()
const modelNameUpperCase = modelName.toUpperCase()
const modelNamePluralLowerCase = modelNamePlural.toLocaleLowerCase()
const modelNamePluralUpperCase = modelNamePlural.toUpperCase()

const typesFileContent = `export const ERROR_${modelNameUpperCase} = 'ERROR_${modelNameUpperCase}'
export const LOADING_${modelNameUpperCase} = 'LOADING_${modelNameUpperCase}'

export const CREATE_${modelNameUpperCase} = 'CREATE_${modelNameUpperCase}'
export const READ_${modelNameUpperCase} = 'READ_${modelNameUpperCase}'
export const READ_${modelNameUpperCase}S = 'READ_${modelNameUpperCase}S'
export const UPDATE_${modelNameUpperCase} = 'UPDATE_${modelNameUpperCase}'
export const DELETE_${modelNameUpperCase} = 'DELETE_${modelNameUpperCase}'
`

fs.writeFile(
  `./client/src/state/${modelNameLowerCase}/${modelNameLowerCase}Types.js`,
  typesFileContent,
  () => console.log(`Types for ${modelName} created successfully`)
)

const actionsFileContent = `
import { 
  ERROR_${modelNameUpperCase}, 
  LOADING_${modelNameUpperCase},
  CREATE_${modelNameUpperCase},
  READ_${modelNameUpperCase},
  READ_${modelNamePluralUpperCase},
  UPDATE_${modelNameUpperCase},
  DELETE_${modelNameUpperCase},
} from './${modelNameLowerCase}Types'

import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING_${modelNameUpperCase} })
}

export const create${modelName} = ${modelNameLowerCase} => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(\`api/${modelNameLowerCase}/\`, ${modelNameLowerCase}, config)
    dispatch({ type: CREATE_${modelNameUpperCase}, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_${modelNameUpperCase}, payload: error.response.data.message })
  }
}

export const read${modelNamePlural} = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('api/${modelNameLowerCase}/all')
    dispatch({ type: READ_${modelNamePluralUpperCase}, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_${modelNameUpperCase}, payload: error.response.data.message })
  }
}

export const update${modelName} = ${modelNameLowerCase} => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(\`api/${modelNameLowerCase}/\${${modelNameLowerCase}._id}\`, ${modelNameLowerCase}, config)
    dispatch({ type: UPDATE_${modelNameUpperCase}, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_${modelNameUpperCase}, payload: error.response.data.message })
  }
}

export const delete${modelName} = ${modelNameLowerCase} => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(\`api/task/\${${modelNameLowerCase}._id}\`)
    dispatch({ type: DELETE_${modelNameUpperCase}, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR_${modelNameUpperCase}, payload: error.response.data.message })
  }
}
`
fs.writeFile(
  `./client/src/state/${modelNameLowerCase}/${modelNameLowerCase}Actions.js`,
  actionsFileContent,
  () => console.log(`Actions for ${modelName} created successfully`)
)

const reducerFileContent = `import { 
  ERROR_${modelNameUpperCase}, 
  LOADING_${modelNameUpperCase},
  CREATE_${modelNameUpperCase},
  READ_${modelNameUpperCase},
  READ_${modelNamePluralUpperCase},
  UPDATE_${modelNameUpperCase},
  DELETE_${modelNameUpperCase},
} from './${modelNameLowerCase}Types'

const initialState = { 
  loading: false, 
  error: null, 
  ${modelNamePluralLowerCase}: [],
}

const ${modelNameLowerCase}Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_${modelNameUpperCase}:
      return { ...state, loading: true }

    case ERROR_${modelNameUpperCase}:
      return { ...state, loading: false, error: action.payload }

    case CREATE_${modelNameUpperCase}:
      return {
        ...state,
        loading: false,
        ${modelNamePluralLowerCase}: [action.payload, ...state.${modelNamePluralLowerCase}],
      }

    case READ_${modelNamePluralUpperCase}:
      return { ...state, loading: false, ${modelNamePluralLowerCase}: action.payload }

    case UPDATE_${modelNameUpperCase}:
      return {
        ...state,
        loading: false,
        ${modelNamePluralLowerCase}: state.${modelNamePluralLowerCase}.map(${modelNameLowerCase} =>
          ${modelNameLowerCase}._id === action.payload._id ? action.payload : ${modelNameLowerCase}
        ),
      }

    case DELETE_${modelNameUpperCase}:
      return {
        ...state,
        loading: false,
        ${modelNamePluralLowerCase}: state.${modelNamePluralLowerCase}.filter(
          ${modelNameLowerCase} => ${modelNameLowerCase}._id !== action.payload._id
        ),
      }

    default:
      return state
  }
}

export default ${modelNameLowerCase}Reducer

`

fs.writeFile(
  `./client/src/state/${modelNameLowerCase}/${modelNameLowerCase}Reducer.js`,
  reducerFileContent,
  () => console.log(`Reducer for ${modelName} created successfully`)
)
