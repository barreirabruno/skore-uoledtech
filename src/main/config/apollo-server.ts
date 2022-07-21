import typeDefs from '../graphql/type-defs'
import resolvers from '../graphql/resolvers'

import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'

export default async (app: Express): Promise<void> => {
  const configs = {
    resolvers,
    typeDefs
  }
  const server = new ApolloServer(configs)
  await server.start()
  server.applyMiddleware({ app })
}
