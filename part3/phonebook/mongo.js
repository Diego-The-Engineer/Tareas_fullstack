import mongoose from "mongoose"

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to mongo database')

mongoose.connect(url, {family: 4} )
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema ({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    Person
    .find({})
    .then(persons =>{
        console.log('Phonebook:')
        persons.forEach( person => {
            console.log(`${person.name} ${person.number}`)
        })
    mongoose.connection.close()
    })
}


else if(process.argv.length === 5){
    const person = new Person ({
    name: `${name}`,
    number: `${number}`
})

person.save().then(res => {
    console.log(`Added  ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})
}else{
    console.log('You must provide a name and a number, or provide your database password')
    process.exit(0)
}


module.exports = mongoose.model('Person', personSchema)

