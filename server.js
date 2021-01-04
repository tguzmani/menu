const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
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

const PORT = process.env.PORT || 8000

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
