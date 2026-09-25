import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl, { family: 4 })
.then(res => {
    console.log('Connected to database')
})
.catch(error => {
    console.log('Failed to connect ', error)
})


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model('Blog', blogSchema)
