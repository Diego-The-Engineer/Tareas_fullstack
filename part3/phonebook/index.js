import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import Person from './models/person.js'

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('post-data', (request, response) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    }
    return ' '
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))


app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const data = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { number: data.number },
        { new: true, runValidators: true }
    )
    .then(res => {
        if(res){
            response.json(res)
        }else{
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(res => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        const fecha = new Date()
        response.send(`<p> Phonebook has info for ${count} people </p> <p> ${fecha} </p>`)
    })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint) 

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) 
  }

  next(error)
}
app.use(errorHandler) 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})