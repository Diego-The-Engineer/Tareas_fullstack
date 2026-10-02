import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import { title } from 'node:process'
import list_helper from './list_helper.js'


const api = supertest(app)

const initialBlogs = [
  { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
  { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://...", likes: 5 }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blog') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned and correct amount', async () => {
  const response = await api.get('/api/blog')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blog')
  assert.notStrictEqual(response.body[0].id, undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Mi nuevo blog de prueba',
    author: 'Diego Gómez',
    url: 'https://diego.com/blog',
    likes: 10
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blog')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const titles = response.body.map(r => r.title)
  assert(titles.includes('Mi nuevo blog de prueba'))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog sin likes definidos',
    author: 'Diego Gómez',
    url: 'https://diego.com/sin-likes'
  }

  const response = await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, 0)
})


test('if title or url are missing, respond 400 (title)', async () => {
 const newBlog = {
    author: 'Diego',
    url: 'https://diego.com/con-likes-pero-sin-nombre',
    likes: 10
  }

  const response = await api
  .post('/api/blog')
  .send(newBlog)
  .expect(400)

})

test('if title or url are missing, respond 400 (url)', async () => {
 const newBlog = {
    title: 'w/title',
    author: 'Diego',
    likes: 10
  }

  const response = await api
  .post('/api/blog')
  .send(newBlog)
  .expect(400)

  
})

test('a blog can be deleted', async () => {
  const responseAtStart = await api.get('/api/blog')
  const blogToDelete = responseAtStart.body[0]
  await api
    .delete('/api/blog/' + blogToDelete.id)
    .expect(204)
  const responseAtEnd = await api.get('/api/blog')
  assert.strictEqual(responseAtEnd.body.length, initialBlogs.length - 1)
  const titles = responseAtEnd.body.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('a blog can be updated', async () => {
  const responseAtStart = await api.get('/api/blog')
  const blogToUpdate = responseAtStart.body[0]
  const updatedData = {
    likes: 50
  }
  const response = await api
    .put('/api/blog/' + blogToUpdate.id)
    .send(updatedData)
    .expect(200) 
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, 50)
})

after(async () => {
  await mongoose.connection.close()
})