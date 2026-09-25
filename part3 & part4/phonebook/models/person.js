import mongoose from "mongoose"
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to mongo database')

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
        validator: function(v) {
            return /^\d{2,3}-\d+$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone is required']
  }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model('Person', personSchema)