import express from 'express'
import Person from '../models/person.js'

const personRouter = express.Router()

personRouter.get('/', (request, response) => {
    Person.find({})
        .then(persons => {
          response.json(persons)
        })
})

personRouter.get('/:id', (request, response) => {
     Person.findById(request.params.id).then(person => {
        if(person) {
          response.json(person)
        } else {    
          response.status(404).end()
        }
      })
        .catch(error => next(error))
})

personRouter.put('/:id', (request, response) => {
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

personRouter.delete('/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
          response.status(204).end()
        })
        .catch(error => next(error))
})

personRouter.post('/', (request, response) => {
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

export default personRouter