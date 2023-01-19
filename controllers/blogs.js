const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    await blog.save()
    
    response.status(201).json(blog)
  }

  catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter