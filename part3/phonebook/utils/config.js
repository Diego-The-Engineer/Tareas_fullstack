import dotenv from 'dotenv'

const configuration = dotenv.config()

const PORT = process.env.PORT || 3001

const mongoUrl = process.env.MONGO_URI

export default {
    PORT, mongoUrl
}