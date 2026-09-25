import dotenv from 'dotenv'

const configuration = dotenv.config()

const PORT = process.env.PORT || 3001

const url = process.env.MONGODB_URI

export default {
    PORT, url
}