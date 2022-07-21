import { setupMiddlewares } from '@/main/config/middlewares'
import setupApolloServer from './apollo-server'

import express from 'express'

const app = express()
void setupApolloServer(app)
setupMiddlewares(app)

export default app
