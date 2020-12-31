const fs = require('fs')

if (!process.argv[2] || !process.argv[3]) {
  console.error('There must be a model name in singular and plural form')
  process.exit(1)
}

const modelName = process.argv[2]
const modelNamePlural = process.argv[3]
const modelNameLowerCase = modelName.toLocaleLowerCase()
const modelNamePluralLowerCase = modelNamePlural.toLocaleLowerCase()

const modelFileContent = `const ${modelName} = require('../models/${modelName}')

exports.create${modelName} = async (req, res) => {
  const ${modelNameLowerCase} = ${modelName}({ ...req.body, user: req.userId })

  ${modelNameLowerCase}
    .save()
    .then(${modelNameLowerCase} => res.send(${modelNameLowerCase}))
    .catch(error => res.status(500).json({error: error.message})) 
}

exports.read${modelNamePlural} = async (req, res) => {
  ${modelName}.find()
    .then(${modelNamePluralLowerCase} => res.send(${modelNamePluralLowerCase}))
    .catch(error => res.status(500).json({ error: error.message }))
}
  
exports.read${modelName} = async (req, res) => {
  ${modelName}.findById(req.params.${modelNameLowerCase}Id)
    .then(${modelNameLowerCase} => {
      if (!${modelNameLowerCase})
        return res.status(400).json({ message: '${modelName} not found' })
      else res.send(${modelNameLowerCase})
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
  
exports.update${modelName} = async (req, res) => {
  ${modelName}.findByIdAndUpdate(req.params.${modelNameLowerCase}Id, req.body, {
    new: true,
  })
    .then(${modelNameLowerCase} => {
      if (!${modelNameLowerCase})
        return res.status(400).json({ message: '${modelName} not found' })
      else res.send(${modelNameLowerCase})
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
  
exports.delete${modelName} = async (req, res) => {
  ${modelName}.findByIdAndDelete(req.params.${modelNameLowerCase}Id)
    .then(${modelNameLowerCase} => {
      if (!${modelNameLowerCase})
        return res.status(400).json({ message: '${modelName} not found' })
      else res.send({ message: '${modelName} deleted' })
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
  
`

fs.writeFile(
  `./controllers/${modelNameLowerCase}Controller.js`,
  modelFileContent,
  () => console.log(`Controller for ${modelName} created successfully`)
)
