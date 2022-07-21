import { makeAddContentResourceController } from '@/main/factories/add-content-resource-controller'

export default {
  Mutation: {
    async add (parent: any, args: any) {
      const controller = makeAddContentResourceController()
      const httpResponse = await controller.perform(args)
      // REMOVE AFTER IMPLEMENT DATABASE REPOS
      if (httpResponse.data.createdAt === undefined) {
        Object.assign(httpResponse.data, { id: 'any_mocked_id', createdAt: new Date(Date.now()) })
      }
      return httpResponse.data
    }
  }
}
