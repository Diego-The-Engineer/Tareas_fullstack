import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import Person from './models/person.js'
const PORT = process.env.PORT
const app = express()
app.use(express.json())

morgan.token('post-data', (request, response) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    }
    return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.use(cors())

app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(res => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const res = persons.find(person => person.name === body.name)
    if(res){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        const fecha = new Date()
        response.send(`<p> Phonebook has info for ${count} people </p> <p> ${fecha} </p>`)
    })
    
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})