import express from 'express'
import Blog from '../models/blog.js' 
const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)
  if(!body.title || !body.url){
    response.status(400).json("message: not complete")
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  const uptBlog = await Blog.findByIdAndUpdate(request.params.id,
    {new: true}
  )
})

export default blogsRouter