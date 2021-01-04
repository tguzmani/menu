const fs = require('fs')

if (!process.argv[2] || !process.argv[3]) {
  console.error('There must be a model name in singular and plural form')
  process.exit(1)
}

const modelName = process.argv[2]
const modelNamePlural = process.argv[3]
const modelNameLowerCase = modelName.toLocaleLowerCase()

const modelFileContent = `const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { auth } = require('../middleware/auth')

const middleware = [auth, monitor]

const {
  create${modelName},
  read${modelName},
  read${modelNamePlural},
  update${modelName},
  delete${modelName},
} = require('../controllers/${modelNameLowerCase}Controller')

router.post('/', middleware, create${modelName})
router.get('/all', middleware, read${modelNamePlural})
router.get('/:${modelNameLowerCase}Id', middleware, read${modelName})
router.put('/:${modelNameLowerCase}Id', middleware, update${modelName})
router.delete('/:${modelNameLowerCase}Id', middleware, delete${modelName})

module.exports = router
`

fs.writeFile(`./routes/${modelNameLowerCase}Routes.js`, modelFileContent, () =>
  console.log(`Routes for ${modelName} created successfully`)
)
