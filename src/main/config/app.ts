import { setupMiddlewares } from '@/main/config/middlewares'
import { setupApolloServer } from './apollo-server'

import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  return app
}
