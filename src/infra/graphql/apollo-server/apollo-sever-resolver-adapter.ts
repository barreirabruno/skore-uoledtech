import { Controller } from '@/presentation/controllers'

import { ApolloError } from 'apollo-server-express'

export const apolloServerResolverAdapter = async (controller: Controller, args: any): Promise<any> => {
  const httpResponse = await controller.perform(args)
  // REMOVE AFTER IMPLEMENT DATABASE REPOS
  if (httpResponse.data.createdAt === undefined) {
    Object.assign(httpResponse.data, { id: 'any_mocked_id', createdAt: new Date(Date.now()) })
  }
  switch (httpResponse.statusCode) {
    case 200:
    case 204:
      return httpResponse.data
    default: throw new ApolloError(httpResponse.data.message)
  }
}
