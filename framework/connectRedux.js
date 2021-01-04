const fs = require('fs')

if (!process.argv[2] || !process.argv[3]) {
  console.error('Usage: npm run connect-redux [modelName] [fileName]')
  process.exit(1)
}

const modelName = process.argv[2]
const fileName = process.argv[3]
const modelNameLowerCase = modelName.toLocaleLowerCase()

const filePath = `./client/src/components/${modelNameLowerCase}/${fileName}.js`
let fileContent = fs.readFileSync(filePath, 'utf-8')

const reduxImport = `import { connect } from 'react-redux'`

fileContent = fileContent.toString().split('\n')
fileContent.splice(1, 0, reduxImport)
fileContent = fileContent.join('\n')

const reduxFooter = `const mapActionsToProps = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(${fileName})
`

const newFileContent = fileContent.replace(
  `export default ${fileName}`,
  reduxFooter
)

fs.writeFileSync(filePath, newFileContent, 'utf-8')
