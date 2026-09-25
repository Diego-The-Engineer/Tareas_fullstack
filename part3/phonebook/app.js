import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import personRouter from './controllers/persons.js'
import blogsRouter from './controllers/blogs.js'
import Person from './models/person.js'

const app = express()


logger.info('Connecting to database')

mongoose.connect(config.mongoUrl, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('post-data', (request) => {
  if(request.method === 'POST'){
    return JSON.stringify(request.body)
  }
  return ' '
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))


app.use('/api/persons', personRouter)
app.use('/api/blog', blogsRouter)

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count =>{
    const fecha = new Date()
    response.send(`<p> Phonebook has info for ${count} people </p> <p>${fecha}</p>`)
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app

