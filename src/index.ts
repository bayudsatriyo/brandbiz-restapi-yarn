import { app } from './applications/app'
import { logger } from './applications/logging'

app.listen(8080, () => {
  logger.info('App listen in port 8080')
  
})
