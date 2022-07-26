import pino, { Logger } from 'pino'
import env from '@/main/config/environment-variables'

export const pinoHelper = {
  createLogger (): Logger {
    return pino({
      enabled: env.logger.enable as unknown as boolean,
      level: env.logger.level,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  },
  logInfo (object: any, layer: string, stack: string): void {
    const trace = JSON.stringify({ object, layer, stackinfo: stack })
    this.createLogger().info(trace)
  },
  logError (error: any, message: string): void {
    this.createLogger().error(error, message)
  }
}
