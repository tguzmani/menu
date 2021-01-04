const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
// const dotenv = require('dotenv')
require('dotenv').config({ path: './config/config.env' })

const app = express()
connectDB()

app.use(express.json({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())

const useRoute = route => {
  app.use(`/api/${route}`, require(`./routes/${route}Routes`))
}

routes = ['auth', 'user', 'routine', 'exercise', 'weight']
routes.forEach(route => useRoute(route))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
