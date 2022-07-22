import { Controller } from '@/presentation/controllers'

import { ApolloError } from 'apollo-server-express'

export const apolloServerResolverAdapter = async (controller: Controller, args?: any): Promise<any> => {
  const request = { ...(args ?? {}) }
  const httpResponse = await controller.perform(request)
  switch (httpResponse.statusCode) {
    case 200:
    case 204:
      return httpResponse.data
    default: throw new ApolloError(httpResponse.data.message)
  }
}
