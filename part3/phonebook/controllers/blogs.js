import express from 'express'
import Blog from '../models/blog.js' 
const blogsRouter = express.Router()

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

export default blogsRouter