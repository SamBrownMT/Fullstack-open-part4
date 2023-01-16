require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(() => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})