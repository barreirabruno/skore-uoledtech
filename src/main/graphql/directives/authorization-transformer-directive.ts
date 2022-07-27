import { makeAuthorizationMiddleware } from '@/main/factories/authorization-middleware'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { ForbiddenError } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'

export const authorizationDirectiveTransformer = (role: string, schema: GraphQLSchema): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')
      if (authDirective != null) {
        const { resolve } = fieldConfig
        fieldConfig.resolve = async (parent, args, context, info) => {
          const request = {
            role: context.req.headers.role
          }
          const httpResponse = await makeAuthorizationMiddleware(role).handle(request)
          if (httpResponse.statusCode === 200) {
            Object.assign(context.req, httpResponse.data)
            return resolve?.call(this, parent, args, context, info)
          } else {
            throw new ForbiddenError(httpResponse.data)
          }
        }
      }
      return fieldConfig
    }
  })
}
