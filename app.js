const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
var morgan = require('morgan')

morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(() => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

 module.exports = app