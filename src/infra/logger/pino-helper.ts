import pino, { Logger } from 'pino'

export const pinoHelper = {
  createLogger (): Logger {
    return pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  },
  logInfo (stack: string): void {
    this.createLogger().info({ stackinfo: stack })
  }
}
