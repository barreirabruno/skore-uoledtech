import { apolloServerResolverAdapter } from '@/infra/graphql/apollo-server/apollo-sever-resolver-adapter'
import { makeAddContentResourceController } from '@/main/factories/add-content-resource-controller'

export default {
  Mutation: {
    add: async (parent: any, args: any, context: any) => {
      return await apolloServerResolverAdapter(makeAddContentResourceController(), args)
    }
  }
}
