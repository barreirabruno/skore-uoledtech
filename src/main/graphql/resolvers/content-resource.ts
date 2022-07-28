import { apolloServerResolverAdapter } from '@/infra/graphql/apollo-server/apollo-sever-resolver-adapter'
import { makeAddContentResourceController } from '@/main/factories/add-content-resource-controller'
import { makeDeactivateContentResourceController } from '@/main/factories/deactivate-content-resource-controller'
import { makeLoadContentResourceController } from '@/main/factories/load-content-resource-controlle'

export default {
  Mutation: {
    add: async (parent: any, args: any, context: any) => {
      return await apolloServerResolverAdapter(makeAddContentResourceController(), args)
    },
    update: async (parent: any, args: any, context: any) => {
      return await apolloServerResolverAdapter(makeAddContentResourceController(), args)
    },
    deactivate: async (parent: any, args: any, context: any) => {
      return await apolloServerResolverAdapter(makeDeactivateContentResourceController(), args)
    }
  },
  Query: {
    viewcontentresource: async (parent: any, args: any, context: any) => {
      return await apolloServerResolverAdapter(makeLoadContentResourceController(), args)
    }
  }
}
