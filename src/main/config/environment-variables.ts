require('dotenv/config')
export default {
  port: process.env.PORT ?? 3333,
  logger: {
    enable: process.env.LOGENABLER ?? false,
    level: process.env.LOGLEVEL ?? 'info'
  }
}
