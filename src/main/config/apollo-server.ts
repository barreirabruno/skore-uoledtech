/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import typeDefs from '../graphql/type-defs'
import resolvers from '../graphql/resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { authorizationDirectiveTransformer } from '../graphql/directives'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === errorName)
}

let schema = makeExecutableSchema({ resolvers, typeDefs })
schema = authorizationDirectiveTransformer('ADMIN', schema)

export const setupApolloServer = (): ApolloServer => new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
  plugins: [{
    requestDidStart: async () => ({
      willSendResponse: async ({ response, errors }) => handleErrors(response, errors ?? [])
    })
  }]
})
