import logger from "./utils/logger.js"
import app from './app.js'
import config from "./utils/config.js"

app.listen(config.PORT, () => {
  logger.info(`Server running in port: ${config.PORT}`)
})