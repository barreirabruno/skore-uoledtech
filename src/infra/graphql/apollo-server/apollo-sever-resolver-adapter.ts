import { Controller } from '@/presentation/controllers'

export const apolloServerResolverAdapter = async (controller: Controller, args: any): Promise<any> => {
  const httpResponse = await controller.perform(args)
  // REMOVE AFTER IMPLEMENT DATABASE REPOS
  if (httpResponse.data.createdAt === undefined) {
    Object.assign(httpResponse.data, { id: 'any_mocked_id', createdAt: new Date(Date.now()) })
  }
  return httpResponse.data
}
